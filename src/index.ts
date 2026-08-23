/**
 * @yantrakit/vedic-icons
 *
 * Pure CSS icon library. Import the CSS file to use:
 *
 * @example
 * ```js
 * import '@yantrakit/vedic-icons/css';
 * ```
 *
 * @example
 * ```html
 * <i class="vi vi-diya"></i>
 * ```
 */

/** List of all available icon names. */
export const icons = ['aarti','aarti-02','agni-dev','anklet','anklet-02','arrow-fire','ashoka-chakra','ayurveda','bangles','banyan-tree','brahma','bull','bull-02','calendar-holi','calendar-kite','calendar-om','calendar-pongol','calendar-swastika','chakra-02','chandan','chandra','chandra-02','coconut-oil','coconut-palm','coconut-palms','coin','cow','cow-02','cow-03','dangle-earrings','dangle-earrings-02','deer','deer-02','devi-eyes','dhanush','diwali-lamps','diya','diya-02','diya-03','durga','elephant','elephant-02','face-male-sikh','family-gathering','female','firecracker','firecracker-02','flute','gada','ganesha','golden-temple','granth-om','granth-swastika','guru','hand-holding-rupee','hanumaan','hanumaan-02','havan-fire','hawa-mahal','herbal-leaf','incense','india-gate','india-map','indian-flag','indra','kalash-swastika','kali','kamdhenu','karma','kartikeya','kathakali','kite','konark-sun-temple','krishna','krishna-02','krishna-with-cow','kurma','ladoo','lakshmi','lal-qila','lantern','lantern-02','lingam','lion','lion-02','lotus','mahabali','mala','male-sikh','male-sikh02','mandala','mandala-02','mangalsutra','mango','mango-tree','mangoes','matsya','meditation','meditation-02','meenakshi-temple','monkey','monkey-02','monkey-03','naans','naga','naga-02','namaste','narasimha','om','palm-leaf-manuscript','parvati','peacock','pichkari','pongal','pongal-02','qutub-minar','radha','raksha-bandhan','raksha-bandhan-02','rama','rangoli','rudraksha','samosa','samosa-chai','samosas','saraswati','sari','scroll','scroll-02','scroll-03','scroll-quill','scroll-rolled','scroll-rolled02','shankh','shirodhara','shiva','shree','sindoor','sita','snake','surya','surya-dev','swan','taj-mahal','temple','thali','third-eye','tiger','tiger-02','tilak','toran','toran-02','trishul','tulsi','turban-02','vamana','varaha','yagna','yagna-02','yama','yantra'] as const;

/** Type representing a valid icon name. */
export type iIconName = (typeof icons)[number];
