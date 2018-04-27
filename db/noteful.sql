-- psql -U dev -d noteful-app -a -f /c/Users/Arsalon/Documents/Thinkful/Workshop/Week4/4Thursday/Sayed-noteful-app-v2/db/noteful.sql
-- \i /c/Users/Arsalon/Documents/Thinkful/Workshop/Week4/3Wednesday/Sayed-noteful-app-v2/db/noteful.sql
-- SELECT CURRENT_DATE;

DROP TABLE IF EXISTS notes_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text NOT NULL
);

ALTER SEQUENCE folders_id_seq RESTART WITH 100;

CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now(),
  folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

ALTER SEQUENCE notes_id_seq RESTART WITH 1000;

CREATE TABLE tags (
  id serial PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE notes_tags (
  note_id INTEGER NOT NULL REFERENCES notes ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags ON DELETE CASCADE
);

INSERT INTO folders (name) VALUES
  ('Archive'),
  ('Drafts'),
  ('Personal'),
  ('Work');

INSERT INTO notes (title, content, folder_id) VALUES
  (
    '5 life lessons learned from cats',
    'Posuere sque eleifend. Aliquam for nec feugiat nisl.',
    100
  ),
  (
    'The most boring article about cats you''ll ever read',
    'Lorem ipsepteur sint occaec est laborum.',
    101
  ),
  (
    '7 things lady gaga has in common with cats',
    'Posuere sacus. Egcett nisl.',
    102
  ),
  (
    'The most incredible article about cats you''ll ever read',
    'Lorem iatur. Excepteid est laborum.',
    102
  ),
  (
    '10 ways cats can help you live to 100',
    'Posuere lacus. Etur ridiculus. Egestassa tempor nec feugiat nisl.',
    101
  ),
  (
    '9 reasons you can blame the recession on cats',
    'Loria deserunt mollit anim id est laborum.',
    103
  ),
  (
    '10 ways marketers are making you addicted to cats',
    'Posuerenauam faucibus purus in massa tempor nec feugiat nisl.',
    103
  ),
  (
    '11 ways investing in cats can make you a millionaire',
    'Lorem ipollit anim id est laborum.',
    100
  ),
  (
    'Why you should forget everything you learned about cats',
    'Posuere saucibus purus in massa tempor nec feugiat nisl.',
    100
  )
;

INSERT INTO tags (name) VALUES 
  ('tag1'),
  ('tag2'),
  ('tag3'),
  ('tag4');

INSERT INTO notes_tags (note_id, tag_id) VALUES 
  ('1000', '4'),
  ('1001', '1'),
  ('1002', '3'),
  ('1003', '1'), ('1003', '3'),
  ('1004', '2'),
  ('1005', '2'), ('1005', '1'),
  ('1006', '4'),
  ('1007', '1'), ('1007', '2'),
  ('1008', '3');