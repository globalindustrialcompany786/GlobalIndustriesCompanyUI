import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './User/header/header.component';
import { HomeIndexComponent } from './User/home-index/home-index.component';
import { FooterComponent } from './User/footer/footer.component';
import { IndexPageComponent } from './User/index-page/index-page.component';
import { AboutUsComponent } from './User/about-us/about-us.component';
import { ContactUsComponent } from './User/contact-us/contact-us.component';
import { IndexGalleryComponent } from './User/index-gallery/index-gallery.component';
import { IndexIntroductionComponent } from './User/index-introduction/index-introduction.component';
import { OurMissionComponent } from './User/our-mission/our-mission.component';
import { CarrerComponent } from './User/carrer/carrer.component';
import { ConstructionComponent } from './Services/construction/construction.component';
import { DriverComponent } from './Services/driver/driver.component';
import { RestaurantHotelComponent } from './Services/restaurant-hotel/restaurant-hotel.component';
import { RefiningChemicalComponent } from './Services/refining-chemical/refining-chemical.component';
import { FactoryWorkersComponent } from './Services/factory-workers/factory-workers.component';
import { FoodPackagingComponent } from './Services/food-packaging/food-packaging.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeIndexComponent,
    FooterComponent,
    IndexPageComponent,
    AboutUsComponent,
    ContactUsComponent,
    IndexGalleryComponent,
    IndexIntroductionComponent,
    OurMissionComponent,
    CarrerComponent,
    ConstructionComponent,
    DriverComponent,
    RestaurantHotelComponent,
    RefiningChemicalComponent,
    FactoryWorkersComponent,
    FoodPackagingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AboutUsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
