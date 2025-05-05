// Import Dependencies
import * as Yup from 'yup'

// Local Imports
//import { isDeltaNotEmpty } from 'utils/quillUtils'

// ----------------------------------------------------------------------

export const schema = Yup.object().shape({
    lead_name: Yup.string()
        .trim()
        .min(2, 'Blog Name Too Short!')
        .max(50, 'Blog Name Too Long!')
        .required('Blog Name Required'),
    // .matches(/^[A-Z0-9]+$/, 'Invalid Blog Title'),
    contact_number: Yup.string()
        .trim()
        .min(2, 'Blog Caption Too Short!')
        .max(50, 'Blog Caption Too Long!')
        .required('Blog Caption Required'),
    lead_source_id: Yup.string()
        .required('Please Select Source'),
    school_id: Yup.string()
        .required('Please Select School'),
    branch_id: Yup.string()
        .required('Please Select Branch'),
    lead_type_id: Yup.string()
        .required('Please Select Lead Type'),
    status_id:Yup.string()
        .required('Please Select Status'),
        owner_id:Yup.string()
        .required('Please Select Sales Person'),
    
    })

 
