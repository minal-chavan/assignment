
/*
 * Created on Tue Aug 06 2019
 *
 * Created by minal chavan
 
 */

const { readdirSync } = require('fs');

module.exports = () => readdirSync(__dirname, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);
