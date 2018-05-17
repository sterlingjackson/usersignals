const { Client } = require('pg');

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  
  const params = [
    data.instance_id,
    data.userid,
    data.event
  ];
  
  try {
    const client = new Client({
      host     : '[rds_host]',
      user     : '[rds_user]',
      password : '[rds_password]',
      database : '[rds_database]',
      port:      '[rds_port]',
    });
  
    await client.connect();
    await client.query('INSERT INTO events (instance_id, user_id, event) VALUES ($1, $2, $3)', params);
    await client.end();
    return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({ 'success': true })
    }
  }
  catch(err) {
    return {
        'statusCode': 500,
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({ 'success': false })
    }
  }
};
