CREATE TABLE `cron_reporting` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `cron_schedule` varchar(100) DEFAULT NULL,
  `queries` text,
  `eval` text,
  `custom_data` text,
  `template_html` varchar(100) DEFAULT NULL,
  `delivery_type` varchar(100) DEFAULT NULL,
  `delivery_to` varchar(100) DEFAULT NULL,
  `last_time_ran` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


INSERT INTO `cron_reporting` ( `
name`,
`active
`, `cron_schedule`, `queries`, `eval`, `custom_data`, `template_html`, `delivery_type`, `delivery_to`, `last_time_ran`)
VALUES
('test', 1, '* * * * *', '{\"rows\":\"SELECT * FROM `information_schema`.`TABLES`;\"}', NULL, NULL, 'test.html', 'email', 'tom.you@disa.com', '2018-03-16 14:41:00');
