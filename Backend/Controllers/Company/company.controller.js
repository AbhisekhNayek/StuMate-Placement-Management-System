import CompanySchema from '../../Models/company.model.js';

// Controller to add a new company
export const addCompany = async (req, res) => {
  try {
    const { companyName, companyDescription, companyWebsite, companyLocation, companyDifficulty } = req.body;

    // Check if the company already exists
    const existingCompany = await CompanySchema.findOne({ companyName });
    if (existingCompany) {
      return res.json({ msg: 'Company Already Exists!' });
    }

    // Create and save a new company
    const newCompany = new CompanySchema({
      companyName,
      companyDescription,
      companyWebsite,
      companyLocation,
      companyDifficulty,
    });

    await newCompany.save();

    return res.status(201).json({ msg: 'Company Created Successfully!' });
  } catch (error) {
    console.error('Error in addCompany:', error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

// Controller to fetch details of a single company by ID
export const companyDetail = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (companyId) {
      const company = await CompanySchema.findById(companyId);
      return res.json({ company });
    } else {
      return res.status(400).json({ msg: 'Company ID is required' });
    }
  } catch (error) {
    console.error('Error in companyDetail:', error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

// Controller to fetch all companies
export const allCompanyDetail = async (req, res) => {
  try {
    const companies = await CompanySchema.find();
    return res.json({ companies });
  } catch (error) {
    console.error('Error in allCompanyDetail:', error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

// Controller to delete a company by ID
export const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ msg: 'Company ID is required' });
    }

    const company = await CompanySchema.findById(companyId);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    await company.deleteOne();
    return res.json({ msg: 'Company Deleted Successfully!' });
  } catch (error) {
    console.error('Error in deleteCompany:', error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};
