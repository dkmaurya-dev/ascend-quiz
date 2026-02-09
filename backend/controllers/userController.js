import  User  from "../model/User.js";

export const createUser = async (req, res) => {
  try {
    const name = req.body.name || "";
    const email = req.body.email || "";
    const password = req.body.password || "";
    const roleId = req.body.roleId || 1;

    if (!name || !email || !password || !roleId) {
      return res.status(400).json({ error: "name, email, password, roleId are required" });
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
      roleId: roleId,
    });

    await User.insertOne(req.body);

    return res.json(user);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};

export const getUser = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};

export const updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const name = req.body.name || "";
    const password = req.body.password || "";
    const roleId = req.body.roleId || 1;

    const user = await User.findOneAndUpdate({ email: email }, { name: name, password: password, roleId: roleId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await User.findOneAndDelete({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};              
