import React, { useState, useRef, FormEvent } from 'react'

import Column from '../../components/Column';

export interface Plans {
  title: string;
  items: Array<string>;
}

const Homepage = () => {
  const [plans, setPlans] = useState<Plans[]>([
    { title: 'Plans for a month', items: ['Celebrate Birthday', 'Go somewhere', 'Make a portfolio'] },
    { title: 'Plans for a next day', items: ['Celebrate Smth', 'Go to the University'] },
    { title: 'Done plans', items: ['Celebrate', 'Make something useful'] },
  ]);
  const [newPlan, setNewPlan] = useState<boolean>(false);
  const [newPlanTitle, setNewPlanTitle] = useState<string>('');
  const dragItem = useRef<any>();
  const dragNode = useRef<any>();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlans(prevPlans => [...prevPlans, { title: newPlanTitle, items: [] }]);
    setNewPlan(false);
    setNewPlanTitle('');
  }

  return (
    <section className='container default-layout'>
      <div className='content'>
        {plans.map((el, idx) => 
          <Column 
            key={el.title}
            columnIdx={idx}
            currentItem={el}
            plans={plans}
            setPlans={setPlans}
            dragItem={dragItem}
            dragNode={dragNode}
          />
        )}
        <div className='column'>
          {!newPlan && <button className='default-button' onClick={() => setNewPlan(true)}>+ Add new plan</button>}
          {newPlan && <form onSubmit={e => submit(e)}>
            <input 
              type='text'
              value={newPlanTitle}
              onChange={e => setNewPlanTitle(e.target.value)}
              className='default-input'
            />
            <button type='submit' className='default-button'>+ Add new plan</button>
          </form>}
        </div>
      </div>
    </section>
  )
}

export default Homepage
