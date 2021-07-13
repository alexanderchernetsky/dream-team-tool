import React, { useEffect } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import store from "../../stores/FeedbackPageStore";
import {
  EmployeeHomepageContent,
  SpinnerWrapper,
} from "../../styled-components/HomepageEmployee";
import EmployeeInfo from "../../components/EmployeeInfo";

interface MatchParams {
  id: string;
}

const EmployeeDetails = ({
  match: { params },
}: RouteComponentProps<MatchParams>): React.ReactElement => {
  const user = store.employeeData;
  useEffect(() => {
    store.getSpecificEmployeeData(params.id);
  }, [params.id]);

  return (
    <Layout>
      <Header pageTitle="Employee Details" />
      {store?.loadingSpecificEmployeeData ? (
        <SpinnerWrapper>
          <Spin size="large" />
        </SpinnerWrapper>
      ) : (
        <>
          <EmployeeHomepageContent>
            <EmployeeInfo
              jobTitle={user?.profile?.job_title}
              focus={user?.profile?.focus}
              name={user?.first_name}
              fullName={user?.full_name}
              age={user?.age}
              email={user?.email}
              birth={user?.date_of_birth}
              rating={user?.profile?.rating}
              imageSrc={user?.image_src}
              yearsOfExperience={user?.years_of_experience}
              shortDescription={user?.profile?.short_description}
              links={user?.profile?.social_links}
            />
          </EmployeeHomepageContent>
        </>
      )}
    </Layout>
  );
};

export default observer(EmployeeDetails);
