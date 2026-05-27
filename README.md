# IT Help Desk Ticketing System

A full-stack IT Help Desk Ticketing System developed using React, PHP, MySQL, and Tailwind CSS. The system is designed to help users report technical issues and allow administrators to manage, assign, and resolve support tickets efficiently through a modern web interface.

## Overview

This project simulates a real-world enterprise help desk platform where users can create support requests and track their progress while administrators handle ticket management, workflow updates, and analytics.

The application includes authentication, role-based access control, ticket workflows, comments, activity tracking, SLA monitoring, analytics dashboards, and responsive UI support.

## Features

- User registration and login system
- Secure password hashing authentication
- Role-based access for users and admins
- Create and manage support tickets
- Ticket status and priority management
- Ticket assignment workflow
- File attachment uploads
- Comments and work notes system
- Activity log timeline
- SLA timer tracking
- Search and filtering functionality
- Pagination for ticket management
- Analytics dashboard with charts
- Responsive mobile-friendly interface
- Dark mode support
- Protected routes for restricted pages

## Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts
- Framer Motion
- Lucide React

Backend:
- PHP
- MySQL

## Functional Modules

### User Side
- Register and login
- Create support tickets
- Upload attachments
- View submitted tickets
- Add comments and work notes

### Admin Side
- View all tickets
- Assign tickets to self
- Update ticket status and priority
- Delete tickets
- View activity logs
- Monitor SLA deadlines
- Access analytics dashboard

## Security

- Passwords are securely hashed using PHP password hashing
- Login verification uses secure password validation

## Future Enhancements

- Email notifications
- Real-time updates
- JWT authentication
- Admin management system
- Advanced reporting and analytics
- Better UI/UX improvements