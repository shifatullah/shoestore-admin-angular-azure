import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
    public username: string;
    public password: string;
    public errorMessage: string;    

    constructor(private router: Router,
        private auth: AuthService) { }

    ngOnInit(): void {
    }        

    authenticate(form: NgForm) {
        if (form.valid) {
            // perform authentication
            this.auth.authenticate(this.username, this.password)
            .subscribe(response => {
                if (response) {
                   this.router.navigateByUrl("/main");
                }
                this.errorMessage = "Authentication Failed";
            })
        } else {
            this.errorMessage = "Form Data Invalid";
        }
    }
}