// import { SearchForm } from '@/components';
// import { Fragment } from 'react';
// import './index.less'
import { SearchForm, FormItem } from '@/components';
import type { FC } from 'react';


const OauthClientPage: FC = () => (
  <SearchForm onSearch={ () => {
  } }>
    <FormItem label="Client Name" type="input" name="clientName" innerProps={ { size: 'middle' } }/>
    <FormItem label="Client ID" type="input" name="clientId" innerProps={ { size: 'middle' } }/>
    {/*<FormItem type="input" name="name1" />*/ }
    {/*<FormItem type="input" name="name2" />*/ }
    {/*<FormItem type="input" name="name3" />*/ }
    {/*<FormItem type="input" name="name4" />*/ }
    {/*<FormItem type="input" name="name5" />*/ }
  </SearchForm>
  // <Fragment>
  //   <div className="tab"></div>
  //   <div className="my-page">
  //     <div className="tabs-main">
  //       <div className="aside-main">
  //         <SearchForm/>
  //       </div>
  //     </div>
  //   </div>
  // </Fragment>

);

export default OauthClientPage;
