import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditComponent } from './subreddit/list-subreddit/list-subreddit.component';
import { AuthGuard } from './auth/auth.guard';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { UserProfilComponent } from './auth/user-profil/user-profil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'user-profile/:name', component: UserProfilComponent, canActivate: [AuthGuard] },
  { path: 'list-subreddits', component: ListSubredditComponent },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
