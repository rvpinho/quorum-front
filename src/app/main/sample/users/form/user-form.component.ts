import { User } from 'app/auth/models';
import { UserService } from '../../../../services/user.service';
import { Component, OnInit } from '@angular/core'
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CoreConfigService } from '@core/services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-user-form.',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {


  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private userService: UserService
  ) { }

  public contentHeader: object
  public coreConfig: any;
  public loginForm: UntypedFormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = "";
  public passwordTextType: boolean;
  public confirmPasswordTextType: boolean;

  user: User = undefined;

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      name: ["", Validators.required],
      login: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    }, { validator: this.passwordMatchValidator });


    this.user = new User();

    if (this._route.snapshot.params.id != null) {
      this.userService.getById(this._route.snapshot.params.id).subscribe(data => {

        this.user.id = this._route.snapshot.params.id;
        this.user.email = data.email;
        this.user.login = data.login;
        this.user.name = data.name;
        this.user.role = data.role;
        this.user.password = data.password;

        this.loginForm.patchValue({
          name: this.user.name,
          login: this.user.login,
          email: this.user.email,
          passwordConfirm: this.user.password,
          password: this.user.password,
        });
      })
    } else {

    }

    this.contentHeader = {
      headerTitle: 'Users',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: []
      }
    }



    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";

  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const passwordConfirm = formGroup.get('passwordConfirm').value;

    if (password !== passwordConfirm) {
      formGroup.get('passwordConfirm').setErrors({ 'passwordMismatch': true });
    } else {
      formGroup.get('passwordConfirm').setErrors(null);
    }
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleConfirmPasswordTextType() {
    this.confirmPasswordTextType = !this.confirmPasswordTextType;
  }

  onSubmit() {
    //this.loading = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.user.createUser(this.loginForm.controls)

    if (this.user.id != undefined) {
      this.userService.update(this.user).subscribe(() => {
        this._router.navigate(["/user"]);
      });

    } else {
      this.userService.save(this.user).subscribe(() => {
        this._router.navigate(["/user"]);
      });
    }







  }
}
