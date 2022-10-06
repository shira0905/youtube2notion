import axios from 'axios';
import { BASE_URL, NOTION_KEY, NOTION_DATABASE_ID } from '../../../constants';
 
const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${NOTION_KEY}`,
    'Notion-Version': '2022-06-28',
  },
  timeout: 20000,
});

const getDatabase = async (id = NOTION_DATABASE_ID) => {
  const response = await request.get(`/databases/${id}`, {
    headers: {
      Authorization: `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2022-06-28',
    },
  });
  return response.data;
};

const addItem = async (data, callback, id = NOTION_DATABASE_ID) => {
  console.log('add item:', data)
  var { name, link, notes, duration, date } =
    data;
  name = name.replace(/ *\([^)]*\) */g, "")
  console.log('name', name)
  const body = {
    parent: { database_id: id },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Link: {
        url: link,
      },
      Notes: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: notes,
            },
          },
        ],
      },
      Duration: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: duration,
            },
          },
        ],
      },
      Date: {
        date: {
          start: date,
        },
      },
    },
  };
  try {
    const response = await request.post(`/pages/`, body, {
      headers: {
        Authorization: `Bearer ${NOTION_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
    });
    console.log(response);
    callback();
  } catch (error) {
    console.log(error);
  }
};

export { getDatabase, addItem };
