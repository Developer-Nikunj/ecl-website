import Image from "next/image";
import styles from "./page.module.css";
import UsersTable from "@/components/admin/users/UsersTable";

export default function Home() {
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="h-100">
                <div className="row mb-3 pb-1">
                  <div className="col-12">
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                      <div className="flex-grow-1">
                        <h4 className="fs-16 mb-1">Good Morning, Anna!</h4>
                        <UsersTable />
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
