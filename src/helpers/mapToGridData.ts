import { IUser, GridDataUser } from "../interfaces/user";

function mapToGridData(results: IUser[]): GridDataUser[] {
  return results.map((item: IUser) => {
    return {
      key: item.id,
      user: item.image_src,
      full_name: item.full_name,
      job_title: item.job_title,
      rating: item.rating,
      focus: item.focus,
      id: item.id,
    };
  });
}

export default mapToGridData;
