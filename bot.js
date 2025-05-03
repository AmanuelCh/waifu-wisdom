import { Bot } from 'grammy';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const bot = new Bot(BOT_TOKEN);

async function postAnimeQuote() {
  try {
    const response = await fetch('https://api.animechan.io/v1/quotes/random');

    if (!response.ok) throw new Error(`Animechan error: ${response.status}`);

    const data = await response.json();
    // const data = {
    //   status: 'success',
    //   data: {
    //     content:
    //       'Glory lies beyond the horizon. Challenge it because it is unreachable. Speak of conquest and demonstrate it.',
    //     anime: { id: 306, name: 'Fate/Zero', altName: 'Fate/Zero' },
    //     character: { id: 1837, name: 'Rider' },
    //   },
    // };
    console.log(data);

    const quote = data.data.content;
    const character = data.data.character.name;
    const anime = data.data.anime.name;

    const message = `<blockquote>${quote}</blockquote>\n<b>—${character}, ${anime}</b>\n━━━━━━━━━━━\n📌 @Anime_Quotes_Hub`;

    await bot.api.sendMessage(CHANNEL_ID, message, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Error posting quote:', error);
  }
}

setInterval(postAnimeQuote, 15000);

bot.start();
