import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CourseInfoCache } from "@/api/courses";

interface Props {
  data?: CourseInfoCache;
}

const CourseInfos = ({ data }: Props) => {
  const [infoCache, setInfoCache] = useState<CourseInfoCache>();

  useEffect(() => {
    if (data) setInfoCache(data);
  }, [data]);

  const CourseInfoItem = ({
    name,
    children,
  }: {
    name: string;
    children?: string;
  }) => {
    return (
      <Typography component="p" variant="body1" gutterBottom>
        <b>{name}:</b>&nbsp;{children}
      </Typography>
    );
  };

  const renderInfos = () => {
    if (!infoCache) return;

    const vals = Object.values(infoCache);
    const names = [
      "Course No",
      "Teacher",
      "Choose Student",
      "All Student",
      "Restrict1",
      "Restrict2",
      "Three Student",
      "Queried Times",
      "Times Per Sec",
      "Updated Time",
    ];

    return vals.map((val, index) => (
      <CourseInfoItem name={names[index]} key={names[index]}>
        {names[index] !== "Updated Time" ? val : new Date(val).toLocaleString()}
      </CourseInfoItem>
    ));
  };

  return <Box>{renderInfos()}</Box>;
};

export default CourseInfos;
