module.exports = {
  description: 'Give a tag to a player',
  onlyOP: false,
  run: async (server, client, args) => {
    if (args.length >= 1) {
      const tag = args.join(' ').replace(/%/gm, '&');
      const nocolors = tag.replace(/&./gm, '');

      if (!(nocolors.length <= 6 && nocolors.length >= 2)) {
        client.write('message', {
          player_id: 0,
          message: 'Tag is bigger than 6, or smaller than 2.',
        });
      } else if ((tag.length / nocolors.length) < 4) {
        const dbPlayer = await server.db.get(client.username);

        dbPlayer.tag = tag;

        await server.db.set(client.username, dbPlayer);

        client.write('message', {
          player_id: 0,
          message: `Applied tag ${tag}!`,
        });
      } else {
        client.write('message', {
          player_id: 0,
          message: 'Actual text to color ratio is weird. Use less colors or more text!',
        });
      }
    } else {
      client.write('message', {
        player_id: 0,
        message: 'Missing argument.',
      });
    }
  },
};
