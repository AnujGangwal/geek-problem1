import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FindFalconeComponent } from './find-falcone/find-falcone.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './success/success.component';
const routes : Routes =[
  {
    path:'',
    component: FindFalconeComponent
  },
  {
    path:'home',
    component: FindFalconeComponent
  },
  {
    path:'success',
    component: SuccessComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FindFalconeComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
