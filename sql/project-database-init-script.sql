/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS subscribe;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS user;



CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY,
    username varchar(64) UNIQUE NOT NULL,
	fname varchar(64),
	lname varchar(64),
    salt TEXT,
    hash TEXT,
    birthday DATE,
    description TEXT,
    is_admin boolean,
    avatar TEXT,
	authToken varchar(128)
);

CREATE TABLE IF NOT EXISTS article (
 article_id INTEGER NOT NULL PRIMARY KEY,
 user_id INTEGER NOT NULL,
 title TEXT NOT NULL,
 content TEXT NOT NULL,
 timestamp timestamp NOT NULL,
 article_image TEXT,
 FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comment (
comment_id INTEGER NOT NULL PRIMARY KEY,
 comment_content TEXT NOT NULL,
 comment_timeStamp  timestamp NOT NULL,
 user_id INTEGER NOT NULL,
 article_id INTEGER NOT NULL,
 parent_id INTEGER,
 FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
 FOREIGN KEY (article_id) REFERENCES article(article_id)  ON DELETE CASCADE
);




CREATE TABLE IF NOT EXISTS subscribe (
 author_id INTEGER NOT NULL,
 subscriber_id INTEGER NOT NULL,
 PRIMARY KEY(author_id,subscriber_id)
 FOREIGN KEY (author_id) REFERENCES user(user_id) ON DELETE CASCADE,
 FOREIGN KEY (subscriber_id) REFERENCES user(user_id) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS likes(
user_id INTEGER NOT NULL,
article_id INTEGER NOT NULL,
 PRIMARY KEY(user_id,article_id)
 FOREIGN KEY (user_id) 
 REFERENCES user(user_id) ON DELETE CASCADE,
 FOREIGN KEY (article_id)  
 REFERENCES article(article_id)  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY,
user_id INTEGER NOT NULL,
target_id TEXT,
avatar TEXT,
title TEXT,
create_time TEXT,
href TEXT, 
 FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

INSERT INTO user (user_id, username, fname, lname,salt, hash, birthday, description, is_admin, avatar, authToken) VALUES 
('1', 'chanjant', 'Jant', 'Chan', 'r3fuw/YOOZN0jg==', 'bdfc17de6abf2081da3e', '2020-08-25', 'Hello', true, 'avatar-6', ''),
('2', 'yvonnedong', 'Yvonne', 'Dong', 'pXRogZtfwaFKfQ==', '43c92ad9aa3f4643c622', '2022-10-06', 'Ni hao', true, 'avatar-2', ''),
('3', 'oliviali', 'Olivia', 'Li', 'q4ExCnLi8Z7MUw==', 'ae79c9c3a78238abf0ef', '2022-10-06', 'Bonjour', true, 'avatar-4', ''),
('4', 'jillqian', 'Jill', 'Qian', 'GoUnYHXo51alhw==', '85a85fe25cd97747e2c0', '2022-10-02', 'Ciao', true, 'avatar-8', ''),
('5', 'jamesbond', 'James', 'Bond', 'tRYNrMKR1h3S7w==', '4ee67d3403fd6d45d249', '2022-10-01', 'Meow', false, 'avatar-3', '');
 

INSERT INTO article (user_id,title,content,timestamp,article_image) VALUES
    (1,'Halloween Ends: When does the real finale come out?','<p> I don''t know what this movie was but 
    I am still waiting on the real final movie in the trilogy to be released. This was just a bad joke 
    right? I kept watching hoping that it would get better and it just didn''t I had heard the final act 
    was good and I was lied to. Then I am not sure what message they were trying to send with their 
    wacky symbolism they do but it went over my head. When it was over me and the girlfriend just felt 
    crushed that it was such a bad movie. 2018 was great and kills was ok but this makes me angry and 
    sad at how disappointing it was.</p>    <p>This wasn''t a Halloween movie. It takes place on halloween 
    and Michael and Laurie cameo in it but that''s it. Every time I look at the rating I am giving it I lower
     the score because I feel I am being too generous.</p>','10/17/2022, 5:31:20 PM','
     ./public/images/article_image/1.png'),
    (2,'AVENGERS: AGE OF ULTRON REVIEW','<p>In the beginning of summer 2012, Marvel unleashed the unprecedented 
    superhero team up with blockbuster film The Avengers. This collaboration of comic book heroes (Iron Man, Thor, 
    Captain America, The Hulk, Black Widow, Hawkeye, etc) was a first by movie standers, demonstrating an ambitious 
    and experimental gamble by the studio heads at Marvel. The gamble, however, played off in a monumental way as 
    The Avengers became the highest grossing movie (both domestic and worldwide) of 2012 with a hefty $1.5 billion 
    in revenue. The movie also paved the way for Marvel to continue its MCU (Marvel Cinematic Universe), expanding 
    the franchise into new avenues with new movies, two TV shows, and whole slew of products and toys. Now, three 
    years later, the summer of 2015 is about to beginning and kicks off triumphantly with the return of Earth’s 
    mightiest heroes in the blockbuster sequel Avengers: Age of Ultron. Can this reassemblage of superheroes relive 
    the glory of its illustrious predecessor or is it a sequel that has too much big budgeted comic book 
    frivolities?</p>','10/10/2022, 5:31:20 PM','./public/images/article_image/2.png'),
    (3,'BLACK WIDOW, Why wasn''t she given a movie back in 2011 or 2012?','<p>The Marvel Cinematic Universe has indeed been an incredible, lucrative, 
    and entertaining to ride since its inception in 2008 with the release of Iron Man. This shared superhero movie 
    universe has incorporated many comic book heroes (both famous and unknown) within Marvel Comics back catalogue; 
    producing heightened cinematic fanfare of epic proportions and box office success whenever each entry gets released.
     In every installment, the MCU has grown in size (expanding its own universe of heroes, gods, and monsters) as well 
     as providing a blockbuster-ish superhero fantasy escapism for moviegoers around the world. Naturally, the franchise
      itself has proven to be a powerhouse juggernaut, cultivating large successful numbers at the box office with every
       entry, which demonstrate the mass appeal of costumed comic book heroes and the need for continuing the various 
       MCU phase sagas in continuing already established ones as well as new ones to fill in the roster. This is 
       especially noticeable after the release of 2019’s Avengers: Endgame, which closed the chapter of the Infinity 
       Saga storyline arc, saying a satisfying farewell to some of the main staple characters in the franchise, and 
       sets a new stage for the MCU heroes to explore and save the world therein. Now, after an almost two-year hiatus 
       since the release of 2019’s Spider-Man: Far from Home, Marvel Studios and director Cate Shortland present the 
       solo movie for Natasha Romanoff (one of the original six Avenger characters in the MCU) with the release of 
       Black Widow. Does this long-awaited solo focused superhero movie gets its “day in the cinematic sun” or is it a 
       bland blockbuster endeavor that never really gets off the ground?

</p>','10/07/2022, 5:31:20 PM','./public/images/article_image/3.png'),
    (4,'CINDERELLA,TRADITIONAL, BUT STILL MAGICIAL','<p>Once upon a time (or rather several years ago), the Walt Disney 
    Company has taken several classic fairytales (some of which they adapted before and immortalized in their 
    illustrious history of animated features) and produced them for big and lavishing live-action theatrical releases.
     Beginning with the sequel reimagining in Alice in Wonderland, to the prequel story in Oz, the Great And Powerful,
      and last year’s untold story in Maleficent, these films have had a unique approach in an attempt to break 
      traditional representation from these iconic tales. Now, for the year of 2015, Walt Disney Pictures continues 
      this fairytale revival with the live-action retelling of the memorable story Cinderella. Does the film find its 
      own cinema “Ever After” magic or has the clock already stroke midnight on this fairytale feature?</p>',
      '10/01/2022, 5:31:20 PM','./public/images/article_image/4.png'),
    (5,'EMMA, LOVE KNOWS BEST','<p>It’s no secret that Jane Austen’s novels are well beloved classics in the 
    literary world. Truly timeless, Austen’s tales weave together narratives of young ladies during the Victorian
     era of England; dealing with issues of family and love throughout as well as commonplace themes of social 
     status / class, individualism, politics, morality, and education amongst other various traits. Additionally, 
     the values of Jane Austen’s novels have been considered timeless; utilizing familiar “coming of age” plot 
     threads that mixes feminism (in a good way) and romance and the roles that they perform in society. It’s 
     been widely accepted by millions that Jane Austen’s books are considered “classics”, with her collection 
     of novels being heavily promoted on variety of platforms and institutions. This also includes Hollywood, 
     which has seeing various theatrical film adaptations of Austen’s work with some famous iterations of her 
     classics, including 1995’s Pride & Prejudice (as well as the 2005 version), 1995’s Sense & Sensibility,
      1995’s Persuasion, 1996’s Emma, and 1999’s Mansfield Park as well as several TV movies / mini-series.
       Now, Hollywood turns once again back to the world of Jane Austen as Universal Pictures (as well as Focus 
       Features and Working Title) and director Autumn de Wilde present a new film adaptation of one Austen’s 
       book with the film Emma. Does this new iteration breathe new cinematic light or is just another one too 
       many Jane Austen adaptations to even care about?</p>','10/02/2022, 5:31:20 PM','./public/images/article_image/5.png'),
    (1,'HAMILTON, IN THE ROOM WHERE IT HAPPENED','<p>Broadway. The name was literally becoming iconic within many shows 
    and productions that have come and gone; gracing their names, star-studded performances, famous musical songs on 
    the mainstage for all to see and producing memorable hits throughout the decades. Through the years, musical 
    Broadway productions and shows have showcased the theatrical arts in its various forms, with such big hits including 
    Les Miserable, Joseph and the Technicolor Dreamcoat, The Phantom of the Opera, Cats, The Lion King, Into the Woods, 
    and Rent just name a few. One such production premiered on the stage back in 2015, with the release of Hamilton. 
    Adapted loosely based on from the 2004 biography book by Ron Chernow, Hamilton follows the story of Alexander 
    Hamilton, the somewhat unsung Founding Father of the United States and those who played a major role throughout the 
    course of his life. Created by Lin-Manuel Miranda, Hamilton quickly rose to critical universal acclaim throughout 
    the theater world, with many clamoring to see the show and gain creativity ingenuity praise for how the play is 
    presented and in the musical numbers. Because of this, Hamilton became a modern hit on Broadway; selling to a 
    plethora of sold out shows and winning numerous awards, including cultivating 11 out of 16 Tony Awards (including 
    Best Musical) as well as receiving the 2016 Pulitzer Prize for Drama. Hamilton even want on tour beyond the streets 
    of Broadway, with several “off-Broadway” productions being represented on various U.S. tours throughout the 
    following years. Now, director Thomas Kali and Disney+ present a film taping version of Lin-Manuel Miranda’s 
    popular Broadway show (with the original cast) in the 2020 movie Hamilton. Does this film translate the stage
     production in a good light or is it a pale comparsion to the 2015 Broadway hit?</p>',
     '10/02/2022, 5:31:20 PM','./public/images/article_image/6.png');
    
INSERT INTO article (user_id, title, content,timestamp, article_image) VALUES (3, 'I had such hope for this', 
'<p>This is the movie I was looking forward to most all year. I avoided all the behind the scenes drama and press 
surrounding it so that I would enjoy the movie for the movie itself because I was so excited purely based on the 
cast alone, plus the soundtrack too after hearing Ooogum Boogum song by Brenton Wood in one of the teasers. 
It starts off showing us this perfect life, too perfect so you have this too good to be true feeling and know 
that something''s amiss throughout. It gave off 60''s American dream life in the suburb''s vibes.</p><p>
Chris Pine really catches your attention with his charisma the way he speaks every time he''s on screen, but 
he''s not saying anything of actual substance. And that''s how the whole movie feels, very captivating and pretty
 to look at, visually stunning; Olivia Wilde did a great job, well produced and has artistic direction but it all 
 feels empty. The writing falls flat and it''s hallow. Someone said Chris Pine is used to disguise mediocre movies
  after ''All the Old Knives'' and I''m starting to see it, he just makes movies seem better than they really are. 
  Olivia Wilde and Florence Pugh did good, with Harry Styles doing as good as you''d expect.</p><p>Slow paced so 
  it has a lot of suspense, arousing questions all movie long and when they finally start getting answered it''s 
  too little too late; the reveal is not big enough to justify the wait. It was an ambitious attempt and showing
   of Wilde''s ability but ultimately underwhelming. It''s just about better than mediocre with everything it does 
   right but other aspects of the movie can''t put it beyond a 6/10. Just feels like it''s missing something. Not 
   as bad as the press around it was, nor as good as those who were hopeful for it thought it was going to be.',
   '10/12/2022, 5:31:20 PM', './public/images/article_image/7.png');
INSERT INTO article (user_id, title, content,timestamp, article_image) VALUES (3, 'A strong soundtrack, casting 
against type, and a few laughs','<p>As a musical, pure and simple, ''Mamma Mia'' has the briefest and silliest of 
stories, backed up by a large selection of Abba songs (Super Trouper, SOS, Voulez Vous, Gimme Gimme Gimme, 
Money Money Money, Dancing Queen, The Winner Takes It All, Lay All Your Love On Me, Our Last Summer, Mamma Mia, 
etc.).</p><p>Meryl Streep has a daughter about to marry, and a cloudy past which has left three possible dads - 
Sam (Pierce Brosnan), Harry (Colin Firth), and Bill (Stellan Skarsgard). Now you can imagine that when Brosnan 
was James Bond he never thought he''d be cavorting along to Swedish pop on the big screen - but despite his weak 
voice, he does OK - the same can be said for Firth, who seems to choose roles with such little discrimination it 
is no longer a surprise to see him in anything.</p><p>Donna (Streep) also has two friends to support her - Julie
 Walters and Christine Baranski. Walters is as fun as ever, cavorting in her headscarf and singing appallingly; 
 while Baranski is another Samantha from Sex and the City - chasing young barmen and struggling in her high heeled
  boots. Their scenes together and apart are hilarious - and Streep''s singing cannot be faulted.</p><p>
Is the film any good? It is hard to tell. It is certainly fun, and funny. The direction isn''t particularly 
inspired, nor is the screenplay clever or profound - but then, neither is the music of Abba. Taken purely as 
bubblegum, feel-good cinema, it does OK, and isn''t as bad as you might have expected.', '10/17/2022, 1:31:20 PM',
'./public/images/article_image/8.png');
INSERT INTO article (user_id, title, content,timestamp, article_image) VALUES (3, 'Messier than it should be', 
'<p>I try to avoid trailers and promos so much so that I thought this was going to be a movie involving trains 
somehow like a biopic of whoever invented them, all I knew was Saoirse Ronan was in it. She was one of the few 
upbeat characters in it so she lit up the screen whenever she was on.</p><p>It''s a movie that talks about itself 
throughout, it''s a whodunnit film and as mentioned in the movie, once you see one you''ve seen them all. The plot
 of the movie is the plot of the theatre play and movie, that''s inside the movie, so when a clue is revealed in 
 one story you know it''s the same for the other.</p><p>It''s suspenseful throughout but not really engaging 
 enough to keep you on your seat. You''re not really invested in any of the characters unless you''re already a 
 fan of the actors playing them, which I was. I''ve seen it compared to "knives out" but I don''t think it''s that 
 good. Nothing really special about it because it just doesn''t click, feels like it''s supposed to though. There''s 
 a lot of funny bits that carry the film, but those feel like an accessory, not actually what the movie is 
 supposed to be about, just something to elevate it. It''s meant to be a mystery but the mystery doesn''t do much.</p>', 
 '09/30/2022, 5:31:20 PM','./public/images/article_image/9.png');
INSERT INTO article (user_id, title, content,timestamp, article_image) VALUES (3, 'Decent prequel', '<p>Mia Goth
 really has the potential to become an Oscar contender. She definitely delivered some amazing acting in this one,
  as well as in "X"! (Hardly wait to see her in the next movie: MaXXXine). About this movie? Well, is the story 
  of the old lady: Pearl from the "X" movie, being now a young girl! The story about a young girl''s life 
  descending into madness! The movie has everything: amazing soundtrack, good cinematography, some good 
  kills(maybe not as brutal and gory as we have seen in "X"), very decent acting and..oh boy, the croc is 
  here again! It really deserve your attention and if it is possible, watch this movie in a cinema theater!</p>',
  '10/01/2022, 5:31:20 PM', './public/images/article_image/10.png');
INSERT INTO article (user_id, title, content,timestamp, article_image) VALUES (3, 'Style over substance', '<p>
I make a point of not watching trailers prior to watching a new film as experience tells me that rather than get
 me excited to watch a movie, they essentially give me an overly exposed look at a film with key plot points 
 being shown. With this in mind, it was almost impossible to not see parts of trailers for Bullet Train, whether
  that was on TV or YouTube advertising etc. The marketing campaign for this film is mental, I have seen it 
  everywhere.</p><p>The trailer makes the movie look like a massive bloated action piece - Think Nonstop meets 
  Train to Busan. However, having watched a couple of YouTube film reviews, I was pleasantly surprised to see it 
  described as not just a brainless action movie, but more of a dialogue-based film with clever writing and fast 
  paced back and forth. One reviewer compared it to Guy Ritchie''s Snatch and the classic Pulp Fiction - Two of my
   favourite and most watched movies. That was enough for me, I was going to give it a try and I booked a couple 
   of tickets for opening day, something that I don''t do very often.</p><p>Let''s start with the Dialogue. If 
   anything, it just tries too hard, far too hard. Most of the jokes didn''t land for me and the delivery of the 
   fast-paced dialogue quite often would not hit the mark. I can''t quite but my finger on why that is. Is it 
   simply poor writing? Or is it down to the delivery? Or is it simply that a number of my favourite movies are 
   heavy, witty dialogue-based movies and my expectations were so high based on several reviews, that I just felt
    disappointed by this? Either way, it didn''t really work for me.','09/29/2022, 5:31:20 PM', 
    './public/images/article_image/11.png');
INSERT INTO article (user_id, title, content,timestamp, article_image) VALUES (3, 'TOM CRUISE YOU LEGEND!', 
'<p>This is one of the best theatrical experiences I''ve had and I''m so happy someone has taken the practical 
route rather than throwing everyone into a green screen. I watched the first one many times and I can''t believe 
this just topped it by a huge margin. Tom Cruise will be written as the most passionate filmmaker in history. 
I mean to put a whole cast in a bunch of f-18 jets and act in a jet as well as film yourself is a huge deal. 
If this movie does not cross a billion then there is something wrong with taste that people have these days. 
So called marvel fans. This is what you call a cinematic experience. Not some cropped cgi scenes.</p>',
'09/07/2022, 5:31:20 PM', './public/images/article_image/12.png');
INSERT INTO article (user_id, title, content,timestamp, article_image) VALUES (3, 'As a book reader, 
this was everything i could have ever hoped for and more!', '<p>House of the Dragon had a lot to prove, thanks to 
a lukewarm ending to Game of Thrones, but also the fact that it''s based on a book that isnt a traditional story 
but more of a history book of a fictional royal family. Many (myself included) were worried about things such as 
dialogue, sub plots, exactly what are they gonna do to fill in the gaps? So many people have a bad taste in their
 mouths after that botched ending? Well, If this episode is any indication, i can breathe a huge sigh of relief. 
 Episode 1 was everything i could have ever hoped for and more, beautifully written, beautifully acted, tragic, 
 thought provoking, and eye opening. Paddy Considine gives a very nuanced portrayal of King Viserys I. Milly 
 Alcock is fun as the fiery Rhaenyra Targaryen, but i believe the real stand out was Matt Smith as Daemon 
 Targaryen, im going to have a blast watching him this season. Even the smaller roles carry huge emotional weight,
  the woman playing Aemma Arryn (forgive me, i dont know the actress'' name) gave a touching performance despite 
  limited screentime.</p><p>Wildly impressed with this premiere! CGI was everything you''ve come to expect with 
  game of thrones but even BIGGER. Everything feels like its on a grander scale than before, this is truly the 
  Targaryens in all their glory.</p><p>If you had any doubts, i hope this premiere episode will put them to rest,
   i am so happy to be back in Westeros again!</p>','09/03/2022, 5:31:20 PM', './public/images/article_image/13.png');
INSERT INTO article (user_id, title, content,timestamp, article_image) VALUES (3, 'It is like Mindhunter - you will 
learn how someone became a serial killer', '<p>When I clicked to watch the "Dahmer"-release on Netflix, I thought it
 would be the so-many''th documentary on him. But what a surprise it was to see that it is actually a mini-series 
 of the crimes that Dahmer committed. And what a mini-series it is!</p><p>The acting is superb. The script is 
 top-notch! The cinematography one of the best that I have seen in a true crime series of a serial killer!I am 
 a big fan of Mindhunter, the show about the origins of the FBI''s Behavioral Science Unit. And I must admit that 
 Dahmer fits right into this type of shows! The show captured me from the first episode and it was a single binge 
 from then on.</p><p>I know that there are many other movies from for instance "People''s Magazine" that portray 
 the crimes commited by notorious killers. But what Netflix has shown with Dahmer, is a complete new level of 
 enactment! The movies from People''s Magazine are just amateur hour compared to the Dahmer-series.</p>',
 '10/01/2022, 5:31:20 PM','./public/images/article_image/14.png');


INSERT INTO comment(comment_content,comment_timeStamp,user_id,article_id,parent_id) VALUES
('It is so good!','2022-10-03T01:05:48Z',1,1,0),
('You are so good!','2022-10-16T01:05:48Z',2,2,0),
('It is not bad!','2022-10-16T01:05:48Z',3,2,2),
('I guess you are right!','2022-10-14T01:05:48Z',1,14,0),
('It is so good!','2022-10-13T01:05:48Z',1,11,0),
('You are so good!','2022-10-11T01:05:48Z',2,13,0),
('It is not bad!','2022-10-11T01:05:48Z',4,3,0),
('I guess you are right!','2022-10-12T01:05:48Z',1,3,0),
('It is so good!','2022-10-11T01:05:48Z',1,3,0),
('You are so good!','2022-10-12T01:05:48Z',2,7,0),
('It is not bad!','2022-10-09T01:05:48Z',3,9,0),
('I guess you are right!','2022-10-08T01:05:48Z',1,8,0),
('It is so good!','2022-10-10T01:05:48Z',1,11,0),
('You are so good!','2022-10-9T01:05:48Z',2,10,0),
('It is not bad!','2022-10-15T01:05:48Z',2,9,0),
('I guess you are right!','2022-10-12T01:05:48Z',1,10,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('You are so good!','2022-10-11T01:05:48Z',2,12,0),
('It is not bad!','2022-10-9T01:05:48Z',5,11,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('It is so good!','2022-10-14T01:05:48Z',1,12,0),
('I guess you are right!','2022-10-8T01:05:48Z',1,3,0);
  
INSERT INTO subscribe (author_id,subscriber_id) VALUES 
    (1,2),  
    (1,3),  
    (2,4),  
    (5,1),  
    (2,1),  
    (3,1);

INSERT INTO likes (user_id,article_id) VALUES     
   (1,2),
   (1,1),
   (1,3),
   (2,3),
   (3,5),
   (5,1),
   (2,4);

INSERT INTO messages (user_id, target_id, avatar, title, create_time, href) VALUES 
('3', '1', 'avatar-6', 'chanjant is now following you', '1666255813916.0', '/profile?user_id=1'),
('5', '1', 'avatar-6', 'chanjant is now following you', '1666255834651.0', '/profile?user_id=1'),
('2', '15', 'avatar-6', 'chanjant published an article "Halloween Ends: When does the real finale come out?"', '1666255852410.0', '/article?user_id=2&article_id=1'),
('3', '15', 'avatar-6', 'chanjant published an article "Halloween Ends: When does the real finale come out?"', '1666255852517.0', '/article?user_id=3&article_id=1'),
('2', '8', 'avatar-6', 'chanjant leaves a comment: "I think I will spend some time to watch it."', '1666255882663.0', '/article?user_id=2&article_id=8'),
('3', '8', 'avatar-6', 'chanjant leaves a comment: "I think I will spend some time to watch it."', '1666255882768.0', '/article?user_id=3&article_id=8'),
( '2', '2', 'avatar-6', 'chanjant leaves a comment: "[Reply yvonnedong]: Actually I do not like the monster they fight with."', '1666255916752.0', '/article?user_id=2&article_id=2'),
('3', '2', 'avatar-6', 'chanjant leaves a comment: "[Reply yvonnedong]: Actually I do not like the monster they fight with."', '1666255916853.0', '/article?user_id=3&article_id=2'),
( '1', '4', 'avatar-8', 'jillqian is now following you', '1666255937303.0', '/profile?user_id=4'),
( '2', '4', 'avatar-8', 'jillqian is now following chanjant', '1666255937303.0', '/profile?user_id=4'),
( '3', '4', 'avatar-8', 'jillqian is now following chanjant', '1666255937303.0', '/profile?user_id=4'),
('3', '4', 'avatar-8', 'jillqian is now following you', '1666255943434.0', '/profile?user_id=4'),
( '1', '4', 'avatar-8', 'jillqian is now following oliviali', '1666255943434.0', '/profile?user_id=4'),
( '1', '8', 'avatar-2', 'yvonnedong leaves a comment: "I don''t know it before."', '1666256265654.0', '/article?user_id=1&article_id=8'),
( '4', '8', 'avatar-2', 'yvonnedong leaves a comment: "I don''t know it before."', '1666256265760.0', '/article?user_id=4&article_id=8'),
( '3', '2', 'avatar-2', 'yvonnedong is now following you', '1666256277169.0', '/profile?user_id=2'),
( '1', '2', 'avatar-2', 'yvonnedong is now following oliviali', '1666256277169.0', '/profile?user_id=2'),
( '4', '2', 'avatar-2', 'yvonnedong is now following oliviali', '1666256277169.0', '/profile?user_id=2'),
( '5', '2', 'avatar-2', 'yvonnedong is now following you', '1666256284569.0', '/profile?user_id=2'),
( '1', '2', 'avatar-2', 'yvonnedong is now following jamesbond', '1666256284569.0', '/profile?user_id=2');

