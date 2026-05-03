<?php

if (!defined('PHPWG_ROOT_PATH')) {
	die('Hacking attempt!');
}

class muoviotukset_voting_maintain extends PluginMaintain
{
	private string $table;

	public function __construct($plugin_id)
	{
		parent::__construct($plugin_id);

		global $prefixeTable;
		$this->table = $prefixeTable.'muoviotukset_votes';
	}

	public function install($plugin_version, &$errors = [])
	{
		$query = '
CREATE TABLE IF NOT EXISTS '.$this->table.' (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	image_id MEDIUMINT UNSIGNED NOT NULL,
	voter_hash CHAR(64) NOT NULL,
	created_at DATETIME NOT NULL,
	PRIMARY KEY (id),
	UNIQUE KEY image_voter (image_id, voter_hash),
	KEY voter_hash (voter_hash),
	KEY image_id (image_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8
;';
		pwg_query($query);
	}

	public function activate($plugin_version, &$errors = [])
	{
		$this->install($plugin_version, $errors);
	}

	public function update($old_version, $new_version, &$errors = [])
	{
		$this->install($new_version, $errors);
	}

	public function deactivate()
	{
	}

	public function uninstall()
	{
		pwg_query('DROP TABLE IF EXISTS '.$this->table.';');
	}
}
