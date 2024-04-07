CREATE DATABASE  IF NOT EXISTS `crowdsensing`

  CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `public_key` varchar(200) NOT NULL,
  `private_key` varchar(200) NOT NULL,
  `is_verified` varchar(1) NOT NULL DEFAULT 'N',
  `phone` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_type` varchar(10) NOT NULL,
  `proof_image` varchar(45),
   `proof_id` int(11)  AUTO_INCREMENT,
  PRIMARY KEY (`id`)
);


--  CREATE TABLE `users` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `first_name` varchar(50) NOT NULL,
--   `last_name` varchar(50) NOT NULL,
--   `email` varchar(60) NOT NULL,
--   `password` varchar(50) NOT NULL,
--   `address` varchar(50) NOT NULL,
--   `public_key` varchar(200) NOT NULL,
--   `private_key` varchar(200) NOT NULL,
--   `is_verified` varchar(1) NOT NULL DEFAULT 'N',
--   `phone` int(11) NOT NULL,
--   `user_type` varchar(10) NOT NULL,
--    `vounteer_proof` varchar(45)  DEFAULT NULL,
--    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   
--   PRIMARY KEY (`id`)
-- );


CREATE TABLE `user_posts` (
  `id` int(11) NOT NULL,
  `place` varchar(45) NOT NULL,
  `details` varchar(45) DEFAULT NULL,
  `contact_person` varchar(45) NOT NULL,
  `contact_no` int(11) NOT NULL,
  `image_location` varchar(45) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verified_count` int(11) NOT NULL DEFAULT '0',
  `first_name` varchar(45) NOT NULL,
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`image_id`)
);

CREATE TABLE `block_chain_crowd` (
  `block_id` int(11) NOT NULL AUTO_INCREMENT,
  `block` blob NOT NULL,
  PRIMARY KEY (`block_id`)
);

