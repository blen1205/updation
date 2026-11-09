/* order-pdf.js — gumagawa ng PDF Order Form (CEAP NCR style) mula sa isang order.
   Gamit: await downloadOrderPdf(order)   (kailangan ng internet para sa jsPDF library) */
(function () {
  const JSPDF = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  const AUTOTABLE = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js";
  const BANNER = "ceap-header.png"; // optional: ilagay dito ang official CEAP NCR banner; kung wala, text header ang gagamitin

  const LEVELS = ["Kinder", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
  const TITLES = [
    "Kindergarten - Visioning Good Manners in Everyday Life: Happy Manners",
    "Grade 1 - Inspiring Good Manners in Everyday Life: Good Manners Matter",
    "Grade 2 - Inspiring Good Manners in Everyday Life: Good Manners for the Heart",
    "Grade 3 - Inspiring Good Manners in Everyday Life: Good and Graceful Manners",
    "Grade 4 - Reinforcing Good Manners in Everyday Life: Upright Conduct",
    "Grade 5 - Reinforcing Good Manners in Everyday Life: Holy and Sacred Conduct",
    "Grade 6 - Reinforcing Good Manners in Everyday Life: Virtuous Behavior",
    "Grade 7 - Treasuring Values Education in Everyday Life: Faithful Footprints",
    "Grade 8 - Treasuring Values Education in Everyday Life: Loving God and Neighbor",
    "Grade 9 - Unfolding Good Manners in Everyday Life: Patriotic Involvement",
    "Grade 10 - Unfolding Good Manners in Everyday Life: Virtuous Decisions",
    "Grade 11 - Empowering Values Education in Everyday Life: Leading with Integrity",
    "Grade 12 - Empowering Values Education in Everyday Life: Serving with Compassion"
  ];

  const num = (n) => Number(n || 0).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtDate = (iso) => { const d = new Date(iso); const p = (x) => String(x).padStart(2, "0"); return p(d.getMonth() + 1) + "/" + p(d.getDate()) + "/" + d.getFullYear(); };

  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => rej(new Error("Failed to load " + src)); document.head.appendChild(s); });
  }
  async function ensureLibs() {
    if (!window.jspdf) await loadScript(JSPDF);
    if (!window.jspdf.jsPDF.API.autoTable) await loadScript(AUTOTABLE);
  }
  // Nagbabalik ng {data, w, h, fmt} o null kapag hindi ma-load
  function loadImg(src, type) {
    return new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        try {
          const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
          const x = c.getContext("2d"); if (type === "image/jpeg") { x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); }
          x.drawImage(img, 0, 0);
          res({ data: c.toDataURL(type), w: c.width, h: c.height, fmt: type === "image/jpeg" ? "JPEG" : "PNG" });
        } catch (e) { res(null); }
      };
      img.onerror = () => res(null);
      img.src = src;
    });
  }

  async function buildOrderPdf(o) {
    await ensureLibs();
    const doc = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    const W = 210, M = 14, items = o.items || [];
    let y;

    // ---- Header ----
    const banner = await loadImg(BANNER, "image/png");
    if (banner) { const h = (W * banner.h) / banner.w; doc.addImage(banner.data, "PNG", 0, 0, W, h); y = h + 6; }
    else {
      doc.setFont("helvetica", "bold"); doc.setFontSize(26); doc.setTextColor(30, 58, 138); doc.text("CEAP NCR", W / 2, 18, { align: "center" });
      doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(0);
      doc.text("Catholic Educational Association of the Philippines", W / 2, 25, { align: "center" });
      doc.text("National Capital Region (CEAP NCR)", W / 2, 30.5, { align: "center" });
      y = 38;
    }
    doc.setTextColor(0); doc.setDrawColor(0); doc.setLineWidth(0.3);
    doc.line(M, y, W - M, y); doc.line(M, y + 8, W - M, y + 8);
    doc.setFont("helvetica", "bold"); doc.setFontSize(10);
    doc.text("CEAP NCR Harmonized MATATAG GMRC/VE - CL WORKTEXT | Order Form", W / 2, y + 5.6, { align: "center" });
    y += 15;

    // ---- Customer info ----
    const row = (l1, v1, l2, v2) => {
      doc.setFontSize(8.5); doc.setFont("helvetica", "normal");
      const a = doc.splitTextToSize(l1, 40), c = l2 ? doc.splitTextToSize(l2, 40) : [];
      doc.setFont("helvetica", "bold");
      const b = doc.splitTextToSize(String(v1 || ""), 48), d = doc.splitTextToSize(String(v2 || ""), 44);
      const n = Math.max(a.length, b.length, c.length, d.length);
      doc.setFont("helvetica", "normal"); doc.text(a, M, y); if (l2) doc.text(c, 108, y);
      doc.setFont("helvetica", "bold"); doc.text(b, 58, y); if (l2) doc.text(d, 152, y);
      y += n * 4 + 3;
    };
    row("Ref. #", o.id, "Date Ordered", fmtDate(o.date));
    row("Arch/Diocese", "", "Region", "");
    row("Complete Name of School", o.customer, "Start of Classes", "");
    row("Delivery Address", o.address, "TIN #", o.tin);
    row("Contact Person", o.contactPerson, "Mobile #", o.contactNumber);
    row("Email Address", o.email);
    row("Finance/Accounting Office Contact Person", o.accountingName, "Finance/Accounting Office Mobile #", o.accountingNumber);
    row("Finance/Accounting Office Email Address", o.accountingEmail);

    // ---- Order details ----
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.text("Order Details:", M, y + 1);
    const qty = {}, price = {};
    items.forEach((i) => { qty[i.level] = (qty[i.level] || 0) + i.qty; price[i.level] = i.price; });
    const body = LEVELS.map((lv, i) => qty[lv]
      ? [TITLES[i], String(qty[lv]), num(price[lv]), num(qty[lv] * price[lv])]
      : [TITLES[i], "-", "-", "-"]);
    const totalQty = items.reduce((t, i) => t + i.qty, 0);
    const sub = o.subtotal != null ? o.subtotal : items.reduce((t, i) => t + i.qty * i.price, 0);
    const disc = o.discount || 0, total = o.total != null ? o.total : sub - disc;
    const foot = [["TOTAL ORDER", String(totalQty), "", num(sub)]];
    if (disc) { foot.push(["LESS: 20% BULK DISCOUNT (100+ books)", "", "", "-" + num(disc)]); foot.push(["NET AMOUNT DUE", "", "", num(total)]); }

    doc.autoTable({
      startY: y + 4, head: [["TITLE", "QTY", "PRICE", "AMOUNT"]], body, foot, theme: "grid", showFoot: "lastPage",
      margin: { left: M, right: M },
      styles: { font: "helvetica", fontSize: 8, cellPadding: 1.3, lineColor: [0, 0, 0], lineWidth: 0.2, textColor: 0 },
      headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: "bold", halign: "center" },
      footStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: "bold" },
      columnStyles: { 1: { halign: "center", cellWidth: 16 }, 2: { halign: "right", cellWidth: 22 }, 3: { halign: "right", cellWidth: 28 } },
      didParseCell: (d) => { if (d.section === "foot" && d.column.index <= 1) d.cell.styles.halign = "center"; }
    });

    // ---- Signatures ----
    let y2 = doc.lastAutoTable.finalY + 10;
    if (y2 > 236) { doc.addPage(); y2 = 20; }
    doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    doc.text("Ordered by:", M, y2); doc.text("Approved by:", 108, y2);
    const lineY = y2 + 27;
    if (typeof o.signature === "string" && o.signature.startsWith("data:image/")) {
      const im = await loadImg(o.signature, "image/jpeg");
      if (im) { const r = Math.min(60 / im.w, 20 / im.h), w = im.w * r, h = im.h * r; doc.addImage(im.data, im.fmt, 52 - w / 2, lineY - h - 1, w, h); }
    }
    doc.setLineWidth(0.3); doc.line(M, lineY, 90, lineY); doc.line(108, lineY, 194, lineY);
    doc.setFont("helvetica", "bold"); doc.text(String(o.contactPerson || ""), 52, lineY + 4.5, { align: "center" });
    doc.setFont("helvetica", "italic"); doc.text("Signature", 52, lineY + 9, { align: "center" }); doc.text("Name & Signature", 151, lineY + 4.5, { align: "center" });
    doc.setFont("helvetica", "normal"); doc.text("Date: " + fmtDate(o.date), M, lineY + 16); doc.text("Date: ____/____/____", 108, lineY + 16);
    return doc;
  }

  window.buildOrderPdf = buildOrderPdf;
  window.downloadOrderPdf = async (o) => { const doc = await buildOrderPdf(o); doc.save("Order-" + o.id + ".pdf"); };
})();