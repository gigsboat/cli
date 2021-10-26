import { formatToMarkdown, getEventsMd } from '../src/utils/md-formatter.js'

test('convert json object to markdown formatting', async () => {
  const json = [
    {
      h1: 'great title'
    },
    {
      p: 'and my paragraph is cool'
    }
  ]
  const markdown = formatToMarkdown(json)
  expect(markdown).toMatchSnapshot()
})

test('process events json data to provide a complete markdown document', () => {
  const events = {
    2016: {
      year: 2016,
      items: [
        {
          attributes: {
            date: new Date('2016-01-01'),
            title: 'title',
            name: 'name',
            slides_url: 'https://example.com',
            recording_url: 'https://example.com',
            country_code: 'US',
            language: null
          }
        }
      ]
    },
    2021: {
      year: 2021,
      items: [
        {
          attributes: {
            date: new Date('2021-02-01'),
            title: 'title',
            name: 'name',
            slides_url: 'https://example.com',
            recording_url: null,
            country_code: null,
            language: 'English'
          }
        },
        {
          attributes: {
            date: new Date('2021-02-02'),
            title: 'title',
            name: 'name',
            slides_url: null,
            recording_url: 'https://example.com',
            country_code: 'US',
            language: 'English'
          }
        }
      ]
    }
  }

  const markdown = getEventsMd(events)
  expect(markdown).toMatchSnapshot()
})