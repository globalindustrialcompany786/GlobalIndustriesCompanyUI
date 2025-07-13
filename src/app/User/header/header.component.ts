import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isUserLoggin: boolean = false;
  admin!: string;
  user!: string;
  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) {
  }

  isUserLoggedIn() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      this.user = `${userData.firstName} ${userData.lastName}`
      return true;// User is logged in
    }
    return false; // User is not logged in
  }

  isAdminLoggedIn() {
    const storedData = localStorage.getItem('adminData');

    if (storedData) {
      const adminData = JSON.parse(storedData);
      this.admin = `${adminData.firstName} ${adminData.lastName}`
      return true;// Admin is logged in
    }
    return false; // admin is not logged in
  }

  logout() {
    localStorage.removeItem("userData");
    localStorage.removeItem("usertoken");
    this.isUserLoggedIn();
    this.router.navigateByUrl("/userForm");
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: Event): void {
    // Check if the click event target is outside the navbar
    if (!this.el.nativeElement.contains(event.target)) {
      // Close the Bootstrap navbar by removing the 'show' class
      const navbarToggler = this.el.nativeElement.querySelector('.navbar-toggler');
      const navbarCollapse = this.el.nativeElement.querySelector('.navbar-collapse');

      if (navbarToggler.getAttribute('aria-expanded') === 'true') {
        this.renderer.removeClass(navbarToggler, 'collapsed');
        this.renderer.removeAttribute(navbarToggler, 'aria-expanded');
        this.renderer.removeClass(navbarCollapse, 'show');
      }
    }
  }

}
