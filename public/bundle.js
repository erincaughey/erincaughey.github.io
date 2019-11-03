
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/Work.svelte generated by Svelte v3.12.1 */

    const file = "src/Work.svelte";

    function create_fragment(ctx) {
    	var div4, img, t0, div3, h4, a, t1, t2, div0, strong0, t4, t5, t6, div1, strong1, t8, t9, t10, div2, strong2, t12, t13;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			img = element("img");
    			t0 = space();
    			div3 = element("div");
    			h4 = element("h4");
    			a = element("a");
    			t1 = text(ctx.headline);
    			t2 = space();
    			div0 = element("div");
    			strong0 = element("strong");
    			strong0.textContent = "About:";
    			t4 = space();
    			t5 = text(ctx.text);
    			t6 = space();
    			div1 = element("div");
    			strong1 = element("strong");
    			strong1.textContent = "Role:";
    			t8 = space();
    			t9 = text(ctx.role);
    			t10 = space();
    			div2 = element("div");
    			strong2 = element("strong");
    			strong2.textContent = "Awards:";
    			t12 = space();
    			t13 = text(ctx.awards);
    			attr_dev(img, "class", "clip svelte-c4kfqd");
    			attr_dev(img, "src", ctx.image);
    			attr_dev(img, "alt", ctx.text);
    			add_location(img, file, 35, 4, 579);
    			attr_dev(a, "class", "all-links");
    			attr_dev(a, "href", ctx.link);
    			add_location(a, file, 37, 12, 666);
    			attr_dev(h4, "class", "svelte-c4kfqd");
    			add_location(h4, file, 37, 8, 662);
    			add_location(strong0, file, 38, 33, 754);
    			attr_dev(div0, "class", "description svelte-c4kfqd");
    			add_location(div0, file, 38, 8, 729);
    			add_location(strong1, file, 39, 26, 817);
    			attr_dev(div1, "class", "role svelte-c4kfqd");
    			add_location(div1, file, 39, 8, 799);
    			add_location(strong2, file, 40, 28, 881);
    			attr_dev(div2, "class", "awards svelte-c4kfqd");
    			add_location(div2, file, 40, 8, 861);
    			attr_dev(div3, "class", "item-group svelte-c4kfqd");
    			add_location(div3, file, 36, 4, 629);
    			attr_dev(div4, "class", "project-item svelte-c4kfqd");
    			add_location(div4, file, 34, 0, 548);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, img);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, h4);
    			append_dev(h4, a);
    			append_dev(a, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div0);
    			append_dev(div0, strong0);
    			append_dev(div0, t4);
    			append_dev(div0, t5);
    			append_dev(div3, t6);
    			append_dev(div3, div1);
    			append_dev(div1, strong1);
    			append_dev(div1, t8);
    			append_dev(div1, t9);
    			append_dev(div3, t10);
    			append_dev(div3, div2);
    			append_dev(div2, strong2);
    			append_dev(div2, t12);
    			append_dev(div2, t13);
    		},

    		p: function update(changed, ctx) {
    			if (changed.image) {
    				attr_dev(img, "src", ctx.image);
    			}

    			if (changed.text) {
    				attr_dev(img, "alt", ctx.text);
    			}

    			if (changed.headline) {
    				set_data_dev(t1, ctx.headline);
    			}

    			if (changed.link) {
    				attr_dev(a, "href", ctx.link);
    			}

    			if (changed.text) {
    				set_data_dev(t5, ctx.text);
    			}

    			if (changed.role) {
    				set_data_dev(t9, ctx.role);
    			}

    			if (changed.awards) {
    				set_data_dev(t13, ctx.awards);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div4);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { image, headline, text, role, awards, link } = $$props;

    	const writable_props = ['image', 'headline', 'text', 'role', 'awards', 'link'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Work> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('image' in $$props) $$invalidate('image', image = $$props.image);
    		if ('headline' in $$props) $$invalidate('headline', headline = $$props.headline);
    		if ('text' in $$props) $$invalidate('text', text = $$props.text);
    		if ('role' in $$props) $$invalidate('role', role = $$props.role);
    		if ('awards' in $$props) $$invalidate('awards', awards = $$props.awards);
    		if ('link' in $$props) $$invalidate('link', link = $$props.link);
    	};

    	$$self.$capture_state = () => {
    		return { image, headline, text, role, awards, link };
    	};

    	$$self.$inject_state = $$props => {
    		if ('image' in $$props) $$invalidate('image', image = $$props.image);
    		if ('headline' in $$props) $$invalidate('headline', headline = $$props.headline);
    		if ('text' in $$props) $$invalidate('text', text = $$props.text);
    		if ('role' in $$props) $$invalidate('role', role = $$props.role);
    		if ('awards' in $$props) $$invalidate('awards', awards = $$props.awards);
    		if ('link' in $$props) $$invalidate('link', link = $$props.link);
    	};

    	return {
    		image,
    		headline,
    		text,
    		role,
    		awards,
    		link
    	};
    }

    class Work extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["image", "headline", "text", "role", "awards", "link"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Work", options, id: create_fragment.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.image === undefined && !('image' in props)) {
    			console.warn("<Work> was created without expected prop 'image'");
    		}
    		if (ctx.headline === undefined && !('headline' in props)) {
    			console.warn("<Work> was created without expected prop 'headline'");
    		}
    		if (ctx.text === undefined && !('text' in props)) {
    			console.warn("<Work> was created without expected prop 'text'");
    		}
    		if (ctx.role === undefined && !('role' in props)) {
    			console.warn("<Work> was created without expected prop 'role'");
    		}
    		if (ctx.awards === undefined && !('awards' in props)) {
    			console.warn("<Work> was created without expected prop 'awards'");
    		}
    		if (ctx.link === undefined && !('link' in props)) {
    			console.warn("<Work> was created without expected prop 'link'");
    		}
    	}

    	get image() {
    		throw new Error("<Work>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get headline() {
    		throw new Error("<Work>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set headline(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Work>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get role() {
    		throw new Error("<Work>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set role(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get awards() {
    		throw new Error("<Work>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set awards(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<Work>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.12.1 */

    const file$1 = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (16:1) {#each items as item, i}
    function create_each_block(ctx) {
    	var current;

    	var work = new Work({
    		props: {
    		image: ctx.item.image,
    		headline: ctx.item.headline,
    		text: ctx.item.text,
    		role: ctx.item.role,
    		awards: ctx.item.awards,
    		link: ctx.item.link
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			work.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(work, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var work_changes = {};
    			if (changed.items) work_changes.image = ctx.item.image;
    			if (changed.items) work_changes.headline = ctx.item.headline;
    			if (changed.items) work_changes.text = ctx.item.text;
    			if (changed.items) work_changes.role = ctx.item.role;
    			if (changed.items) work_changes.awards = ctx.item.awards;
    			if (changed.items) work_changes.link = ctx.item.link;
    			work.$set(work_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(work.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(work.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(work, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(16:1) {#each items as item, i}", ctx });
    	return block;
    }

    function create_fragment$1(ctx) {
    	var div, current;

    	let each_value = ctx.items;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr_dev(div, "class", "container");
    			add_location(div, file$1, 14, 0, 201);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.items) {
    				each_value = ctx.items;

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},

    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$1.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	

    let items = [];

    onMount(async () => {
    	const res = await fetch(`data.json`);
    	$$invalidate('items', items = await res.json());
    });

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    	};

    	return { items };
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment$1.name });
    	}
    }

    const app = new App({
    	target: document.querySelector('#content')
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
