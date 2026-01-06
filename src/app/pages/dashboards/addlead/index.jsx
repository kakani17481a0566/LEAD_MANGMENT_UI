// Import Dependencies
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

// Local Imports
import { schema } from "./schema";
import { Page } from "components/shared/Page";
import { Button, Card, Input, Switch } from "components/ui";
import { Combobox } from "components/shared/form/Combobox";
import { LEAD_ENDPOINTS } from "constants/apiConfig";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

// ----------------------------------------------------------------------

const lead_source = [
  { id: 1, label: "Meta Ads" },
  { id: 2, label: "Referral" },
  { id: 3, label: "Google" },
  { id: 4, label: "Website" },
  { id: 5, label: "Organic" },
  { id: 6, label: "Walk-in" },
  { id: 7, label: "Parking Board" },
];

const schools = [{ id: 1, name: "My School Italy Hyderabad" }];

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

const defaultState = {
  id: 0,
  lead_name: "",
  contact_number: "",
  lead_source_id: 0,
  school_id: "",
  branch_id: "",
  lead_type_id: "",
  lead_date_time: "",
  is_converted: false, // ✅ boolean
  lead_list_id: 1,
  status_id: 0,
  owner_id: 0,
  sales_person_id: 1,
};

const AddLead = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [leadId, setLeadid] = useState(0);



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultState,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get("id");
        setLeadid(id);

        if (!id) {
          reset(defaultState);
          return;
        }

        const { data: response } = await axios.get(
          `${LEAD_ENDPOINTS.LEAD}/${id}`
        );

        const newdata = {
          id: response.id,
          lead_name: response.leadName,
          contact_number: response.contactNumber,
          lead_source_id: response.leadSourceId,
          school_id: response.schoolId,
          branch_id: response.branchId,
          lead_type_id: response.leadTypeId,
          lead_date_time: response.dateTime,
          is_converted: response.converted === true, // ✅ boolean
          lead_list_id: response.leadListId,
          status_id: response.statusId,
          owner_id: response.ownerId,
          sales_person_id: response.salesPersonId,
        };

        reset(newdata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location.search, reset]);

  const saveData = async (data) => {
    const postData = {
      LeadName: data.lead_name,
      ContactNumber: data.contact_number,
      LeadSourceId: Number(data.lead_source_id),
      BranchId: Number(data.branch_id),
      LeadTypeId: Number(data.lead_type_id),
      DateTime: new Date().toISOString(),
      Converted: !!data.is_converted, // ✅ boolean
      SalesPersonId: 1,
      LeadListId: 1,
      StatusId: Number(data.status_id),
      OwnerId: Number(data.owner_id),
      SchoolId: Number(data.school_id),
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      if (leadId && Number(leadId) > 0) {
        await axios.put(
          `${LEAD_ENDPOINTS.LEAD}/${leadId}`,
          postData,
          axiosConfig
        );

        toast("Lead updated successfully", { invert: true });
      } else {
        await axios.post(
          LEAD_ENDPOINTS.LEAD,
          postData,
          axiosConfig
        );

        toast("New lead created successfully", { invert: true });
        reset(defaultState); // ✅ reset form
        setLeadid(0);
      }
    } catch (error) {
      console.error("API ERROR:", error.response?.data || error);
      toast("Something went wrong. Please try again.", { invert: true });
    }
  };

  const onSubmit = (data) => {
    saveData(data);
  };

  return (
    <Page title="New Lead">
      <div className="transition-content px-(--margin-x) pb-6">
        <div className="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6">
          <div className="flex items-center gap-1">
            <DocumentPlusIcon className="size-6" />
            <h2 className="line-clamp-1 text-xl font-medium text-gray-700 dark:text-dark-50">
              {leadId ? "Edit Lead" : "New Lead"}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button
              className="min-w-[7rem]"
              variant="outlined"
              onClick={() => navigate("/dashboards/lead")}
            >
              To List
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
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          id="new-post-form"
        >
          <div className="grid grid-cols-12 place-content-start gap-4 sm:gap-5 lg:gap-6">
            {/* Left Section */}
            <div className="col-span-12 lg:col-span-8">
              <Card className="p-4 sm:px-5">
                <div className="mt-5 space-y-5">
                  <Input
                    label="Lead Name"
                    placeholder="Enter the Lead name"
                    {...register("lead_name")}
                    error={errors?.lead_name?.message}
                  />

                  <Input
                    label="Contact Number"
                    placeholder="Enter the contact number"
                    {...register("contact_number")}
                    error={errors?.contact_number?.message}
                  />

                  {/* School */}
                  <Controller
                    render={({ field: { value, onChange, ...rest } }) => (
                      <Combobox
                        data={schools}
                        displayField="name"
                        value={
                          schools.find((school) => school.id === value) || null
                        }
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

                  {/* Branch */}
                  <Controller
                    render={({ field: { value, onChange, ...rest } }) => (
                      <Combobox
                        data={branchs}
                        displayField="name"
                        value={
                          branchs.find((branch) => branch.id === value) || null
                        }
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

            {/* Right Section */}
            <div className="col-span-12 space-y-4 sm:space-y-5 lg:col-span-4 lg:space-y-6">
              <Card className="space-y-5 p-4 sm:px-5">
                {/* Lead Source */}
                <Controller
                  render={({ field: { value, onChange, ...rest } }) => (
                    <Combobox
                      data={lead_source}
                      displayField="label"
                      value={
                        lead_source.find((Source) => Source.id === value) ||
                        null
                      }
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

                {/* Lead Type */}
                <Controller
                  render={({ field: { value, onChange, ...rest } }) => (
                    <Combobox
                      data={lead_types}
                      displayField="name"
                      value={
                        lead_types.find((LeadType) => LeadType.id === value) ||
                        null
                      }
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

                {/* Status */}
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

                {/* Owner */}
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

                {/* Converted */}
                <Switch label="Converted" {...register("is_converted")} />
              </Card>
            </div>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default AddLead;
