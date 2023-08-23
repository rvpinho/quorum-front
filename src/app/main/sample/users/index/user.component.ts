import { User } from 'app/auth/models';
import { UserService } from '../../../../services/user.service';
import { Component, OnInit } from '@angular/core'
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user.',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,    
    private _router: Router,
  ) {}

  public contentHeader: object
  
  popupVisivel = false;

  users: User[];

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Users',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: []
      }
    }

    this.users = [];

    this.userService.getAll().subscribe( data => {
      data.forEach(element => {
        let user = new User();
        user.id = element['_id'];
        user.email = element.email;
        user.login = element.login;
        user.name = element.name;
        user.role = element.role;
        this.users.push(user);
        this.cdr.detectChanges();
      })
    } )

  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      window.location.reload();
    })
  }

}
