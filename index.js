'use strict';

const { Client } = require('pg');

module.exports.handler = async (event, context) => {

  const client = new Client(JSON.parse(process.env.DB));
  const message = JSON.parse(event.Records[0].body);

  client.connect();

  const response = await client.query(
    `UPDATE expenses SET status = 'closed' WHERE id = ${message.expense}`
  );

  await client.end();

  // Dejo el console.log para CloudWatch
  console.log(`UPDATE expenses SET status = 'closed' WHERE id = ${message.expense}`);

  return { 'message': 'update_expense executed successfully', response };
};