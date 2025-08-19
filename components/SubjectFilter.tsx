'use client';

import { subjects } from '@/constants';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('subject') || '';

  const [chosenSubject, setChosenSubject] = useState(query);

  useEffect(() => {
    let newUrl = '';
    if (chosenSubject === 'all') {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject'],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'subject',
        value: chosenSubject,
      });
    }

    router.push(newUrl, { scroll: false });
  }, [chosenSubject, pathname, router, searchParams]);

  return (
    <Select onValueChange={setChosenSubject} value={chosenSubject}>
      <SelectTrigger className='input capitalize'>
        <SelectValue placeholder='Select subject' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className='capitalize'>
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
