import { supabase } from '../lib/supabaseClient';

const DATA = {
  title: 'Novy kurz',
  slug: 'novy-kurz',
  description: 'Toto je moj novy kurz cislo 1',
  image: 'https://avatars.githubusercontent.com/u/7920607?v=4',
  subcategory: 2,
  author: '71b87485-a8db-4c4b-bd02-94eac15a31ee',
  content: [
    {
      section: 'Introduction',
      lessons: [
        {
          title: 'Introduction lesson 1',
          description: 'Lesson 1 description',
        },
      ],
    },
    {
      section: 'Section 1',
      lessons: [
        {
          title: 'Lesson 2',
          description: 'Lesson 2 description',
        },
      ],
    },
  ],
};

function PlayWithDb() {
  const addData = async () => {
    const { data, error } = await supabase.from('courses').upsert({
      title: DATA.title,
      slug: DATA.slug,
      description: DATA.description,
      image: DATA.image,
      subcategory: DATA.subcategory,
      author: DATA.author,
      content: DATA.content,
    });
    console.log(data, error);
  };
  const getData = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select(`*, author(*), subcategory(name, main_category(name))`);
    // console.log(JSON.stringify(data[0], null, 2), error);
    console.log(data[0].content[0]);
  };
  return (
    <div className="flex flex-col items-center w-full space-y-5 ">
      <button onClick={addData} className="p-3 border w-[150px]">
        Add Data
      </button>
      <button onClick={getData} className="p-3 border w-[150px]">
        Read Data
      </button>
    </div>
  );
}

export default PlayWithDb;
