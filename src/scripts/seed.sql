insert into course (name, description, status) values('Software Eningeering in Python', 'Software Engineering Plan', 'Not started');
insert into course (name, description, status) values('Cloud Computing', 'Cloud Computing Plan', 'Not started');
insert into course (name, description, status) values('Web Development', 'Web Development Plan', 'Not started');

insert into section (title, "courseId") values('Getting Started', 'ce03ef71-0ac0-4d00-b663-40e3e988ca4f');
insert into section (title, "courseId") values('Python Fundamentals', 'ce03ef71-0ac0-4d00-b663-40e3e988ca4f');

insert into chapter (title, duration, "sectionId") values('Data types', '2.01', '8b7185f8-7b38-4bd3-983c-31755c3a8d5f');