import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Job from "./Job";
import NewsLetter from "./NewsLetter";
import { Collapse, theme, ConfigProvider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";


const getItems = (panelStyle) => [
    {
      key: "1",
      label: "How do I post a job on SkillHub?",
      children: (
        <p className="pl-10">
          To post a job on SkillHub, simply visit the{" "}
          <span className="font-semibold">Add Jobs</span> page. Provide essential
          details such as the job title, deadline, and a comprehensive
          description. Choose the relevant category from the dropdown menu, and
          set your desired price range. Once you&apos;ve filled in all the
          necessary information, click the{" "}
          <span className="font-semibold">Add Jobs</span> button to submit your
          posting. It&apos;s that easy to connect with skilled freelancers and get
          your project underway
        </p>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label:
        "What measures are in place to ensure the quality and security of the services provided?",
      children: (
        <p className="pl-10">
          SkillHub maintains a stringent vetting process for all freelancers on
          the platform. We verify the skills and qualifications of each
          professional, and our secure payment system ensures that transactions
          are safe and reliable. Additionally, our rating and review system allows
          clients to provide feedback, ensuring transparency and accountability
          within our community.
        </p>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label:
        " Can I request custom project requirements tailored to my specific business needs?",
      children: (
        <p className="pl-10">
          Absolutely! SkillHub encourages custom project requests that align with
          your unique business requirements. Our platform allows you to
          communicate directly with freelancers, ensuring that your project needs
          are understood and implemented to your satisfaction.
        </p>
      ),
      style: panelStyle,
    },
  ];

const HomeCatagories = () => {
    const [loading, setLoading] = useState(false);
    const [web, setWeb] = useState(null);
    const [digital, setDigital] = useState(null);
    const [graphics, setGrapics] = useState(null);
    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: "none",
        fontSize: 18,
      };

      useEffect(() => {
        fetch("http://127.0.0.1:8000/alljob")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            let newData = data.filter((job) => job.category == "Web Development");
            setWeb(newData);
            console.log(newData);
            newData = data.filter((alljob) => alljob.category == "Digital Marketing");
            setDigital(newData);
            console.log(newData);
            newData = data.filter((alljob) => alljob.category == "Graphics Design");
            setGrapics(newData);
            console.log(newData);
            setLoading(true);
          });
      }, []);
    return (
        <div>
            <div className="flex mb-10 flex-col-reverse lg:flex-row">
        <div className="lg:w-3/5 p-5">
          <p className="mx-2 lg:text-6xl  text-4xl font-bold my-5">
            Where Ideas
            <span className="text-[#ff715b]"> Come to Life</span>
          </p>
          <p className="text-xl mb-5">
            At SkillHub, we curate a diverse community of adept professionals.
            Whether you&apos;re a buyer seeking the perfect digital solution or
            a seller looking to showcase your skills, our platform is designed
            to cater to all your needs. From engaging website content to
            compelling marketing strategies and stunning visual designs, our
            pool of experienced writers and experts is dedicated to bringing
            your ideas to life and captivating your target audience.
          </p>
          <button className="btn bg-[#ff715b] text-[#FFF]">Explore</button>
        </div>
        <div className="lg:w-2/5 ">
          <img
            className="rounded-lg"
            src="https://i.ibb.co/kSTKt9F/top-view-hands-typing-keyboard-23-2149476770.jpg"
            alt=""
          />
        </div>
      </div>
      {(loading) ?<Tabs>
        <TabList>
          <Tab>Web Development</Tab>
          <Tab>Digital Marketing</Tab>
          <Tab>Graphics Design</Tab>
        </TabList>
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20">
          {web !== null && web.length > 0 ?
          web.map((job) => {
              return <Job key={job.id} job={job}></Job>;
            }):
            <div>
                <div className="mx-auto w-1/3">
                <img className="w-full" src="https://i.ibb.co/vdpPPw3/images.jpg" alt="" />
                </div>
                <p className="text-center text-2xl lg:text-5xl font-semibold">You don&apos;t make any job post yet</p>
            </div>
            }
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20">
          {digital !== null && digital.length > 0 ?
          digital.map((job) => {
              return <Job  key={job.id} job={job}></Job>;
            }):
            <div>
                <div className="mx-auto w-1/3">
                <img className="w-full" src="https://i.ibb.co/vdpPPw3/images.jpg" alt="" />
                </div>
                <p className="text-center text-2xl lg:text-5xl font-semibold">You don&apos;t make any job post yet</p>
            </div>
            }
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20">
          {graphics !== null && graphics.length > 0 ?
          graphics.map((job) => {
              return <Job  key={job.id} job={job}></Job>;
            }):
            <div>
                <div className="mx-auto w-1/3">
                <img className="w-full" src="https://i.ibb.co/vdpPPw3/images.jpg" alt="" />
                </div>
                <p className="text-center text-2xl lg:text-5xl font-semibold">You don&apos;t make any job post yet</p>
            </div>
            }
          </div>
        </TabPanel>
      </Tabs>:
        <div className="flex justify-center items-center text-7xl h-80">
        <span className="loading loading-dots loading-lg"></span>
        </div>
    }

      <NewsLetter></NewsLetter>
      <p className="text-center text-3xl font-semibold my-5">
        Frequently Asked Questions
      </p>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={getItems(panelStyle)}
      />
      <ConfigProvider
        theme={{
          token: {
            fontSize: 50,
            headerBg: "#ff715b",
          },
        }}
      ></ConfigProvider>

        </div>
    );
};

export default HomeCatagories;