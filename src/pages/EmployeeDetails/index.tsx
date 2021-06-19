import React, {useEffect} from "react";
import {Spin} from "antd";
import {observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import loginStore from "../../stores/LoginStore";
import UserMainInfo from "../../components/UserMainInfo";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import feedBackStore from "../../stores/FeedbackPageStore";
import {
    EmployeeHomepageContent,
    SpinnerWrapper,
} from "../../styled-components/HomepageEmployee";


const EmployeeDetails = ({location}: RouteComponentProps): React.ReactElement => {

  const id = location.pathname.replace("/employee-details/", '')
  const user = feedBackStore.employeeData;

  useEffect(() => {
      feedBackStore.getSpecificEmployeeData(id);
  }, [id]);

  return (
      <Layout>
          {!loginStore?.user ? (
              <SpinnerWrapper>
                  <Spin size="large"/>
              </SpinnerWrapper>
          ) : (
              <>
                  {/* Header */}
                  <Header pageTitle="Home page"/>
                  {/* Content */}
                  <EmployeeHomepageContent>
                      {/* User Info */}
                      <UserMainInfo
                          jobTitle={user?.profile?.job_title}
                          focus={user?.profile?.focus}
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


export default observer(EmployeeDetails)