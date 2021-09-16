import {Component, Input} from '@angular/core';
import {ILesson} from "../../interfaces/lesson";
import {IUser} from "../../interfaces/user";
import {Profile} from "../../providers/profile";

@Component({
  selector: 'lesson',
  templateUrl: 'lesson.html'
})

export class LessonComponent {

  user: IUser = null;

  @Input('lesson') lesson: ILesson = null;

  constructor() {
    Profile.listen((user: IUser) => {
      this.user = user;
    });
  }
}
