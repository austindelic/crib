export function generate_init_house_md(user_name: string, house_name: string): string {
	return `# Welcome to **${house_name}** 🏡

Hi ${user_name}, and welcome to your new shared home on **crib.**

This document is written in **GitHub Flavoured Markdown (GFM)** — meaning you can:

- Add formatting like **bold**, _italics_, and [links](https://github.com/austindelic/crib)
- Use lists, checkboxes, tables, and even emojis ✨
- Edit this document anytime to keep your house info up to date

---

## 🔑 What’s Next?

Here are some quick things to get you started:

- [ ] Invite your housemates using the **Join Code**
- [ ] Set up your custom welcome page
- [ ] Log any house issues on the **Issues Page**
- [ ] Assign chores and add key events to your **House Calendar**
- [ ] Enable **Bills & Reimbursements** (coming soon!)

---

## 🛠️ Pro Tips

- This markdown file is private to your house but fully editable.
- You can use it for notes, agreements, rosters, shared goals — anything you want.
- Use markdown features like:

  \`\`\`md
  ## Example Heading
  - Task list
  - Notes
  \`\`\`

---

Happy co-living from the **crib.** team 💫  
_“Live better, together.”_
`;
}
