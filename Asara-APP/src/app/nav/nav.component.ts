import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService) {
   }

  ngOnInit() {
  }
  setOpen(event) {
    const item = event.target.closest('.has-dropdown');
    const icon = find(item, 'i');

    if (item) {
      item.classList.toggle('opened');
      icon.classList.remove('fa-arrow-up');
      icon.classList.add('fa-arrow-down');
      
      if (item.classList.contains('opened')) {
          const toOpen = find(item, '.sidebar-dropdown');
          if (toOpen) {
              toOpen.classList.add('active');
          }
      } else {
          find(item, '.sidebar-dropdown').classList.toggle('active');
          icon.classList.toggle('fa-arrow-up');
          icon.classList.toggle('fa-arrow-down');
      }
    }
  }

  isMutch(){
    return this.auth.roleMatch(['Admin']);
  }
}

function find(el, selector) {
  const finded = el.querySelector(selector);
  return finded ? finded : null;
}
