import CareerIcon from '@/assets/icons/taskCreate/career.svg';
import HealthIcon from '@/assets/icons/taskCreate/health.svg';
import FinanceIcon from '@/assets/icons/taskCreate/finance.svg';
import EducationIcon from '@/assets/icons/taskCreate/education.svg';
import PersonalDevelopmentIcon from '@/assets/icons/taskCreate/people.svg';

import RelationshipsIcon from '@/assets/icons/taskCreate/relationships.svg';
import HobbiesAndInterestsIcon from '@/assets/icons/taskCreate/hobbies.svg';
import SpiritualDevelopmentIcon from '@/assets/icons/taskCreate/spiritual.svg';
import HomeAndLifestyleIcon from '@/assets/icons/taskCreate/lifestyle.svg';
import {FC} from 'react';
import {SvgProps} from 'react-native-svg';
import {ECategory} from '@/types/common';

export interface Category {
  id: string;
  title: string;
  value: ECategory;
  Icon: FC<SvgProps>;
}

export const Categories: Category[] = [
  {id: '1', title: 'Career', value: ECategory.CAREER, Icon: CareerIcon},
  {id: '2', title: 'Health', value: ECategory.HEALTH, Icon: HealthIcon},
  {id: '3', title: 'Finance', value: ECategory.FINANCE, Icon: FinanceIcon},
  {
    id: '4',
    title: 'Personal Development',
    value: ECategory.PERSONAL_DEVELOPMENT,
    Icon: PersonalDevelopmentIcon,
  },
  {
    id: '5',
    title: 'Relationships',
    value: ECategory.RELATIONSHIP,
    Icon: RelationshipsIcon,
  },

  {
    id: '6',
    title: 'Hobbies and Interests',
    value: ECategory.HOBBIES_AND_INTERESTS,
    Icon: HobbiesAndInterestsIcon,
  },
  {
    id: '7',
    title: 'Education',
    value: ECategory.EDUCATION,
    Icon: EducationIcon,
  },
  {
    id: '8',
    title: 'Spiritual Development',
    value: ECategory.SPIRITUAL_DEVELOPMENT,
    Icon: SpiritualDevelopmentIcon,
  },
  {
    id: '9',
    title: 'Home and Lifestyle',
    value: ECategory.HOME_AND_LIFESTYLE,
    Icon: HomeAndLifestyleIcon,
  },
];
