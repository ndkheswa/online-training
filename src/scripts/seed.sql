insert into course (name, description, status) values('Software Eningeering in Python', 'Software Engineering Plan', 'Not started');
insert into course (name, description, status) values('Cloud Computing', 'Cloud Computing Plan', 'Not started');
insert into course (name, description, status) values('Web Development', 'Web Development Plan', 'Not started');

insert into section (title, "courseId") values('Getting Started', 'f51fa024-c06d-4635-8cab-b4f2b7ffb3c5');
insert into section (title, "courseId") values('Python Fundamentals', 'f51fa024-c06d-4635-8cab-b4f2b7ffb3c5');

insert into chapter (title, duration, "sectionId") values('Data types', '2.01', 1);