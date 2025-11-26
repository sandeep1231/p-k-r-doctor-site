import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YOUTUBE_PLAYLIST_ID, YOUTUBE_CHANNEL_ID, YOUTUBE_API_KEY } from '../../config/media-info';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.scss']
})
export class BlogSectionComponent implements AfterViewInit, OnDestroy {
  configuredPlaylistId = YOUTUBE_PLAYLIST_ID;
  channelId = YOUTUBE_CHANNEL_ID;
  safePlaylistUrl: SafeResourceUrl | null = null;
  apiKey = YOUTUBE_API_KEY;
  items: Array<{ videoId: string; title: string; thumbnail: string }> | null = null; // used for either carousel (API) or grid (rss2json)
  loading = false;
  carouselMode = false; // true only when using YouTube Data API
  currentVideoId: string | null = null; // inline playback selection
  player: any = null; // YT.Player instance
  playerReady = false;
  isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 576px)').matches;
  useStandardEmbedSelected = true; // always use standard iframe so native controls show
  displayedLimit = 8; // number of videos shown in grid
  private observer: IntersectionObserver | null = null;
  private readonly sliceStep = 8;
  @ViewChild('gridSentinel') gridSentinel?: ElementRef<HTMLDivElement>;

  get playlistId(): string | null {
    if (this.configuredPlaylistId && this.configuredPlaylistId !== 'PLAYLIST_ID_REPLACE') {
      return this.configuredPlaylistId;
    }
    if (this.channelId && this.channelId !== 'CHANNEL_ID_REPLACE') {
      // Derive uploads playlist: UCxxxx -> UUxxxx
      if (this.channelId.startsWith('UC')) {
        return 'UU' + this.channelId.substring(2);
      }
    }
    return null;
  }

  get hasPlaylist() {
    return !!this.playlistId;
  }

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    // Always show native YouTube controls across devices
    this.displayedLimit = this.isMobile ? 4 : 8;
    const id = this.playlistId;
    if (!id) return;
    // If API key provided, try to fetch items for carousel; else fall back to simple embed
    if (this.apiKey && this.apiKey !== 'YOUTUBE_API_KEY_REPLACE') {
      this.loading = true;
      try {
        const maxResults = 8;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${encodeURIComponent(id)}&key=${encodeURIComponent(this.apiKey)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const mapped = (data.items || [])
            .map((it: any) => {
              const videoId = it.snippet?.resourceId?.videoId;
              const title = it.snippet?.title || '';
              const thumbs = it.snippet?.thumbnails || {};
              const thumbnail = thumbs.maxres?.url || thumbs.high?.url || thumbs.medium?.url || thumbs.default?.url || '';
              return videoId ? { videoId, title, thumbnail } : null;
            })
            .filter((x: any) => !!x);
          if (mapped && mapped.length) {
            this.items = mapped as any;
            this.carouselMode = true;
            this.loading = false;
            return;
          }
        }
      } catch (e) {
        console.warn('YouTube fetch failed', e);
      } finally {
        this.loading = false;
      }
    }
    // Try rss2json playlist feed to build a grid (no API key required)
    try {
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(id)}`;
      const rss2json = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
      const res = await fetch(rss2json);
      if (res.ok) {
        const data = await res.json();
        if (data?.items?.length) {
          // map full list; we'll control how many are shown via displayedLimit
          const mappedAll = data.items.map((it: any) => {
            const link: string = it.link || '';
            const videoId = link.split('v=')[1] || '';
            const title: string = it.title || '';
            // thumbnails: use media thumbnail if present
            const thumbnail: string = it.thumbnail || '';
            return videoId ? { videoId, title, thumbnail } : null;
          }).filter((x: any) => !!x);
          if (mappedAll.length) {
            this.items = mappedAll as any;
            // Not carousel mode; we'll show grid
            this.buildFallbackPlaylistUrl(id);
            this.setupObserver();
            return;
          }
        }
      }
    } catch (e) {
      console.warn('rss2json fetch failed', e);
    }
    // Fallback to simple playlist embed
    this.buildFallbackPlaylistUrl(id);
  }

  private buildFallbackPlaylistUrl(id: string) {
    const url = `https://www.youtube.com/embed/videoseries?list=${id}&rel=0&playsinline=1&controls=1`;
    this.safePlaylistUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  safeVideoUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1&controls=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeSelectedVideoUrl(videoId: string): SafeResourceUrl {
    // Use standard embed with full native controls; avoid autoplay to ensure UI shows immediately on mobile
    const url = `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1&controls=1&fs=1&modestbranding=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  openVideo(videoId: string) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  }
  openPlaylist() {
    const id = this.playlistId;
    if (id) {
      window.open(`https://www.youtube.com/playlist?list=${id}`, '_blank');
    }
  }
  selectVideo(videoId: string) {
    console.log('Selecting video', videoId);
    this.currentVideoId = videoId;
    if (!this.useStandardEmbedSelected) {
      // Defer creation to allow template to render host element
      setTimeout(() => this.initPlayer(videoId), 50);
    }
  }
  closeVideo() {
    this.currentVideoId = null;
    if (this.player) {
      try { this.player.destroy(); } catch {}
      this.player = null;
      this.playerReady = false;
    }
  }
  private ensureApiScript() {
    if ((window as any).YT && (window as any).YT.Player) return Promise.resolve();
    return new Promise<void>((resolve) => {
      const existing = document.getElementById('yt-iframe-api');
      if (!existing) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      (window as any).onYouTubeIframeAPIReady = () => {
        resolve();
      };
    });
  }
  private async initPlayer(videoId: string) {
    const host = document.getElementById('selected-video-host');
    if (!host) return;
    await this.ensureApiScript();
    if (this.player) {
      try { this.player.destroy(); } catch {}
    }
    this.player = new (window as any).YT.Player(host, {
      videoId,
      playerVars: {
        rel: 0,
        playsinline: 1,
        modestbranding: 1,
        controls: 1,
        enablejsapi: 1
      },
      events: {
        onReady: () => { this.playerReady = true; },
        onError: (e: any) => { console.warn('YT Player error', e); }
      }
    });
  }
  play() { if (this.playerReady) { try { this.player.playVideo(); } catch {} } }
  pause() { if (this.playerReady) { try { this.player.pauseVideo(); } catch {} } }
  seek(delta: number) {
    if (this.playerReady) {
      try {
        const t = this.player.getCurrentTime() + delta;
        this.player.seekTo(Math.max(0, t), true);
      } catch {}
    }
  }
  showMore() {
    if (this.items && this.displayedLimit < this.items.length) {
      this.displayedLimit = Math.min(this.items.length, this.displayedLimit + this.sliceStep);
    }
  }

  ngAfterViewInit(): void {
    this.setupObserver();
  }
  ngOnDestroy(): void {
    if (this.observer) { this.observer.disconnect(); this.observer = null; }
  }
  private setupObserver() {
    if (this.carouselMode) return; // only for grid mode
    const el = this.gridSentinel?.nativeElement;
    if (!el || !this.items || this.items.length <= this.displayedLimit) return;
    if (this.observer) { this.observer.disconnect(); this.observer = null; }
    this.observer = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        this.showMore();
      }
    }, { root: null, rootMargin: '0px 0px 200px 0px', threshold: 0 });
    this.observer.observe(el);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Fallback for browsers where IntersectionObserver may not trigger reliably
    if (!this.items) return;
    const doc = document.documentElement;
    const pageHeight = Math.max(doc.scrollHeight, doc.offsetHeight);
    const nearBottom = window.innerHeight + window.scrollY >= (pageHeight - 200);
    if (nearBottom && this.displayedLimit < this.items.length) {
      this.showMore();
    }
  }
  posts = [
    { title: 'Understanding Fever Causes & Warning Signs', excerpt: 'Recognise patterns, when to seek medical review...' },
    { title: 'Diabetes Risk Factors for Adults', excerpt: 'Lifestyle and metabolic markers to monitor...' },
    { title: 'Preventive Vaccinations Every Adult Should Consider', excerpt: 'Stay updated on essential adult immunisations...' },
    { title: 'How to Recover Safely After ICU Discharge', excerpt: 'Steps, nutrition and follow-up for stable recovery...' }
  ];
}
