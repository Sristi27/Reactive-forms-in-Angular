import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  forbiddenuserNames=['Sourav','Riya'];
  signUpForm:FormGroup;
  ngOnInit(){
    this.signUpForm=new FormGroup({
      'userData':new FormGroup({
        'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]), //binds to this class
        'email':new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails),
      }),
       
       'gender':new FormControl('male'),
       'hobbies': new FormArray([]),
    });

  }

  onSubmit(){
console.log(this.signUpForm);
this.signUpForm.reset();
  }

  addHobby(){

    const control=new FormControl(null,Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);

  }
  forbiddenNames(control:FormControl):{[s:string]:boolean}{
    if(this.forbiddenuserNames.indexOf(control.value) !== -1 )  //-1 is considered true
    return {'NameForbidden':true};

    return null;
  }
  forbiddenEmails(control:FormControl):Promise<any> | Observable<any>{
    const promise= new Promise<any>(
      (resolve,reject)=>{
        setTimeout(()=>{
          if(control.value === 'test@test.com')
          resolve({'emailForbidden':true});
          else
          resolve(null);

        },1500)
      }
    );
    return promise;
  }
}
