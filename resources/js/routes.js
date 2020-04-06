import signin from './views/signin'
import register from './views/register'
import home from './views/home'

//courses
import coursesIndex from './views/Courses/index'
import viewCourse from './views/Courses/view'

//lecturers
import viewLecturer from './views/Lecturers/view'
import lecturersIndex from './views/Lecturers/index'

//Enrolments
import viewEnrolment from './views/Enrolments/view'
import enrolmentsIndex from './views/Enrolments/index'

export default [
    {
        path: '/signin',
        component: signin,
        name: 'signin'
    },
    {
        path: '/register',
        component: register,
        name: 'register'
    },
    {
      path: '/',
      component: home,
      children: [
          {
            path: '',
            component: coursesIndex,
            name: 'coursesIndex'
          },
          {
            path: 'view/course/:course_id',
            component: viewCourse,
            name: 'viewCourse'
          },
          {
            path: 'lecturers',
            component: lecturersIndex,
            name: 'lecturersIndex'
          },
          {
            path: 'view/lecturer/:lecturer_id',
            component: viewLecturer,
            name: 'viewLecturer'
          },
          {
            path: 'enrolments',
            component: enrolmentsIndex,
            name: 'enrolmentsIndex'
          },
          {
            path: 'view/enrolments/:enrolment_id',
            component: viewEnrolment,
            name: 'viewEnrolment'
          }

      ],
      meta: {
        authRequired: true
      }
    },
]
