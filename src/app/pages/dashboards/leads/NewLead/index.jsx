// Import Dependencies
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

// Local Imports
import { schema } from "./schema";
//import { Page } from "components/shared/Page";
import { Button, Card, Input, Switch } from "components/ui";
//import { Delta } from "components/shared/form/TextEditor";
// import { CoverImageUpload } from "./components/CoverImageUpload";
// import { Tags } from "./components/Tags";
// import { ContextualHelp } from "components/shared/ContextualHelp";
// import { DatePicker } from "components/shared/form/Datepicker";
// import { Listbox } from "components/shared/form/Listbox";
import { Combobox } from "components/shared/form/Combobox";
import axios from 'axios';
import { useState, useEffect } from "react";

// ----------------------------------------------------------------------

// const initialState = {id:0,lead_name: "", contact_number:"",lead_source_id: 0,  school_id: "",  branch_id: "",
//                       lead_type_id: "",  lead_date_time: "",  is_converted:0,  lead_list_id:0,  status_id:0,
//                       owner_id:0,  sales_person_id:0, };
const lead_source = [
  { id: "1", label: "Meta Ads", },
  { id: "2", label: "Referral", },
  { id: "3", label: "Google", },
  { id: "4", label: "Website", },
  { id: "5", label: "Organic", },
  { id: "6", label: "Walk-in", },
  { id: "7", label: "Parking Board", },
];
const schools = [
  { id: 1, name: "My School Italy Hyderabad" },

];
const branchs = [
  { id: 1, name: "Avance" },
  { id: 2, name: "Hitex" },
  { id: 3, name: "Kaveri Hills" },
  { id: 4, name: "Kondapur" },
  { id: 5, name: "KPHB" },
  { id: 6, name: "Manikonda" },
  { id: 7, name: "Mindspace" },
  { id: 8, name: "Miyapur" },
  { id: 9, name: "QCity" },

];
const lead_types = [
  { id: 1, name: "Hot Lead" },
  { id: 2, name: "Waste Lead" },


];
const status = [
  { id: 1, name: "Open" },
  { id: 2, name: "Visiting Soon" },
  { id: 3, name: "School Visited" },
  { id: 4, name: "Closed" },
  { id: 5, name: "Not Interested" },
  { id: 6, name: "InProcess" },


];
const owners = [
  { id: 1, name: "Maneendra" },
  { id: 2, name: "Lokesh" },


];

export default function NewLead() {


  const [initialState, setinitialState] = useState({
    id: 0, lead_name: "", contact_number: "", lead_source_id: 0, school_id: "", branch_id: "",
    lead_type_id: "", lead_date_time: "", is_converted: 0, lead_list_id: 0, status_id: 0,
    owner_id: 0, sales_person_id: 0,
  });



  useEffect(() => {
    setinitialState({
      id: 0, lead_name: "", contact_number: "", lead_source_id: 0, school_id: "", branch_id: "",
      lead_type_id: "", lead_date_time: "", is_converted: 0, lead_list_id: 1, status_id: 0,
      owner_id: 0, sales_person_id: 1,
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,

  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  const formatDate = (date) => {
    let datePart = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()

    ].map((n, i) => n.toString().padStart(i === 2 ? 2 : 2, "0")).join("-");
    let timePart = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ].map((n) => n.toString().padStart(2, "0")).join(":");
    return datePart + " " + timePart;
  }

  const saveData = async (data) => {
    //var todate= new Date();
    var postData = {
      "leadName": data.lead_name,
      "contactNumber": data.lead_name,
      "leadSourceId": data.lead_source_id,
      "branchId": data.branch_id,
      "leadTypeId": data.lead_type_id,
      "dateTime": formatDate(new Date()),
      "converted": data.is_converted,
      "salesPersonId": 1,
      "leadListId": 1,
      "statusId": data.status_id,
      "ownerId": data.owner_id,
      "schoolId": data.school_id
    };
    console.log(postData);
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    };


    try {


      // axios.post('https://localhost:7257/api/Lead', postData, axiosConfig)
      axios.post(LEAD_ENDPOINTS.LEAD, postData, axiosConfig)

        .then((res) => {
          toast("New Post Published. Now you can add new one", {
            invert: true,
          });
          console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    } catch (error) {
      console.error(error)
    }

  };

  const onSubmit = (data) => {
    //alert("sdasd");
    console.log(data);

    saveData(data);
    toast("New Post Published. Now you can add new one", {
      invert: true,
    });

  };

  return (

    <div className="transition-content px-(--margin-x) pb-6">
      <div className="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6">
        <div className="flex items-center gap-1">
          <DocumentPlusIcon className="size-6" />
          <h2 className="line-clamp-1 text-xl font-medium text-gray-700 dark:text-dark-50">
            New Lead
          </h2>
        </div>
        <div className="flex gap-2">
          <Button className="min-w-[7rem]" variant="outlined">
            Preview
          </Button>
          <Button
            className="min-w-[7rem]"
            color="primary"
            type="submit"
            form="new-post-form"
          >
            Save
          </Button>
        </div>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} id="new-post-form"   >
        <div className="grid grid-cols-12 place-content-start gap-4 sm:gap-5 lg:gap-6">
          <div className="col-span-12 lg:col-span-8">
            <Card className="p-4 sm:px-5">

              <div className="mt-5 space-y-5">
                <Input
                  label="Lead Name"
                  placeholder="Enter the Lead title"
                  {...register("lead_name")}
                  error={errors?.lead_name?.message}
                />

                <Input
                  label="Contact Number"
                  placeholder="Enter the post caption"
                  {...register("contact_number")}
                  error={errors?.contact_number?.message}
                />
                <Controller
                  render={({ field: { value, onChange, ...rest } }) => (
                    <Combobox
                      data={schools}
                      displayField="name"
                      value={schools.find((school) => school.id === value) || null}
                      onChange={(val) => onChange(val?.id)}
                      placeholder="Please Select School"
                      label="Select School"
                      searchFields={["name"]}
                      error={errors?.school_id?.message}
                      highlight
                      {...rest}
                    />
                  )}
                  control={control}
                  name="school_id"
                />
                <Controller
                  render={({ field: { value, onChange, ...rest } }) => (
                    <Combobox
                      data={branchs}
                      displayField="name"
                      value={branchs.find((branch) => branch.id === value) || null}
                      onChange={(val) => onChange(val?.id)}
                      placeholder="Please Select Branch"
                      label="Select Branch"
                      searchFields={["name"]}
                      error={errors?.branch_id?.message}
                      highlight
                      {...rest}
                    />
                  )}
                  control={control}
                  name="branch_id"
                />


              </div>
            </Card>
          </div>
          <div className="col-span-12 space-y-4 sm:space-y-5 lg:col-span-4 lg:space-y-6">
            <Card className="space-y-5 p-4 sm:px-5">

              <Controller
                render={({ field: { value, onChange, ...rest } }) => (
                  <Combobox
                    data={lead_source}
                    displayField="label"
                    value={lead_source.find((Source) => Source.id === value) || null}
                    onChange={(val) => onChange(val?.id)}
                    placeholder="Please Select Source"
                    label="Select Source"
                    searchFields={["label"]}
                    error={errors?.lead_source_id?.message}
                    highlight
                    {...rest}
                  />
                )}
                control={control}
                name="lead_source_id"
              />

              <Controller
                render={({ field: { value, onChange, ...rest } }) => (
                  <Combobox
                    data={lead_types}
                    displayField="name"
                    value={lead_types.find((LeadType) => LeadType.id === value) || null}
                    onChange={(val) => onChange(val?.id)}
                    placeholder="Please Select Lead Type"
                    label="Select Lead Type"
                    searchFields={["name"]}
                    error={errors?.lead_type_id?.message}
                    highlight
                    {...rest}
                  />
                )}
                control={control}
                name="lead_type_id"
              />

              <Controller
                render={({ field: { value, onChange, ...rest } }) => (
                  <Combobox
                    data={status}
                    displayField="name"
                    value={status.find((v) => v.id === value) || null}
                    onChange={(val) => onChange(val?.id)}
                    placeholder="Please Select Status"
                    label="Select Status"
                    searchFields={["name"]}
                    error={errors?.status_id?.message}
                    highlight
                    {...rest}
                  />
                )}
                control={control}
                name="status_id"
              />

              <Controller
                render={({ field: { value, onChange, ...rest } }) => (
                  <Combobox
                    data={owners}
                    displayField="name"
                    value={owners.find((v) => v.id === value) || null}
                    onChange={(val) => onChange(val?.id)}
                    placeholder="Please Select Sales Person"
                    label="Select Sales Person"
                    searchFields={["name"]}
                    error={errors?.owner_id?.message}
                    highlight
                    {...rest}
                  />
                )}
                control={control}
                name="owner_id"
              />
              <Switch label="Converted" {...register("is_converted")} />
            </Card>


          </div>
        </div>
      </form>
    </div>

  );
};


