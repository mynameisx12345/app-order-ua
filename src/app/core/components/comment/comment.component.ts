import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { fadeAnimation, listAnimation} from '../../../app.animation';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [fadeAnimation, listAnimation]
})
export class CommentComponent implements OnInit {
  @Input() comments:any = [];
  @Output() addCommentSrc:any = new EventEmitter;
  @Output() removeCommentSrc:any = new EventEmitter;
  @Output() editCommentSrc:any = new EventEmitter;
  newComment = new FormControl('');
  edittedComment = new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);
  currentUser: any;
  hasUserLogged = false;

  constructor(
    private readonly userService: UserLogService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user:any)=>{
      this.currentUser = user;
    });
    this.userService.logged.subscribe((logged:any)=>{
      this.hasUserLogged = logged;
    })
  }

  addComment(){
    this.addCommentSrc.emit(this.newComment.value);
    // this.comments.push({
    //   message: this.newComment.value, 
    //   user:`${this.currentUser.first_name} ${this.currentUser.last_name}`,
    //   isRead: true,
    //   originalMessage: this.newComment.value
    // });
    this.newComment.setValue('');
   
  }

  removeComment(comment:any){
    this.removeCommentSrc.emit(comment);
  }

  startEditComment(comment:any){
    comment.isRead = false;
    comment.originalMessage = comment.message;
    //this.edittedComment.setValue(comment.message);
  }
  
  editComment(comment:any){
      this.editCommentSrc.emit(comment);
      //this.comments[index].message = this.edittedComment.value;

  }

  cancelComment(comment:any){
    comment.isRead = true;
    comment.message = comment.originalMessage
  }

  cleanString(data:string){
    if(data){
      return data.trim().replace(/\n/g, '<br/>');
    } else {
      return data;
    }
  }

  canEdit(comment:any){
    return this.currentUser?.id === comment.user_id;
  }

}
