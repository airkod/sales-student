import {Component} from '@angular/core';
import {ICourse} from "../../interfaces/course";
import {Api} from "../../providers/api";

@Component({
  selector: 'course',
  templateUrl: 'course.html'
})

export class CourseComponent {

  course: ICourse;

  constructor(
    public api: Api
  ) {
    this.api.course().then((course: ICourse) => {
      this.course = course;
    });
  }
}
