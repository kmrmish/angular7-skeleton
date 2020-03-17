import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './TestComponent/test.component';

const routes: Routes = [
  {
    path: 'test-path', component: TestComponent, data: { title: 'Test' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
