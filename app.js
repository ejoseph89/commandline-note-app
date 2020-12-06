// Required modules
const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');


// Customize yargs version
yargs.version('1.1.0');

// Set up yargs to support: add, remove, read, list
// create ADD command | Need title and body
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note content',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.addNotes(argv.title, argv.body)
  }
});

// create remove commmand | Need title
yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.removeNote(argv.title);
  }
});

// create list command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler () {
    notes.listNotes();
  }
});

// create read command | Need title
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler (argv) {
    notes.readNote(argv.title);
  }
});

yargs.parse();
// console.log(yargs.argv);