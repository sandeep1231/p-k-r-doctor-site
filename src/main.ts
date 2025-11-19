import 'zone.js'; // Ensure Zone.js loaded (needed for change detection)
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideHttpClient()]
}).catch(err => console.error(err));
