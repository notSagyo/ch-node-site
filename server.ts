import { oak } from './deps.ts';

// Constants =================================================================//
const app = new oak.Application();
const router = new oak.Router();
const port = 8080;
const colors: string[] = [];

// Routes ====================================================================//
router.get('/', (ctx) => {
  const html = Deno.readFileSync('./index.html');
  const htmlString = new TextDecoder().decode(html);
  const colorsHtml = colors.reduce(
    (a, c) => (a += `<li style="color: ${c};">${c}</li>`),
    ''
  );
  ctx.response.body = htmlString.replaceAll('{{colors}}', colorsHtml);
});

router.post('/', async (ctx) => {
  const formData = await ctx.request.body({ type: 'form-data' }).value.read();
  colors.push(formData.fields.colorPicker);
  ctx.response.redirect('/');
});

// Setup =====================================================================//
app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: http://localhost:${port}`);
});

app.listen({ port });
