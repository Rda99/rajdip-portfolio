import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiChevronDown } from "react-icons/fi";

const Contact = () => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsExpanded(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-orange-500 mb-12 text-center"
        >
          Get in Touch
        </motion.h2>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="bg-black/50 p-8 rounded-lg border border-orange-500/20"
        >
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => setIsExpanded(!isExpanded)}
            onMouseEnter={handleExpand}
          >
            <h3 className="text-xl font-semibold text-white">Send me a message</h3>
            <motion.div
              animate={{
                rotate: isExpanded ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="text-orange-500" size={20} />
            </motion.div>
          </div>

          <motion.form
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-black/50 border-orange-500/20 focus:border-orange-500"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-black/50 border-orange-500/20 focus:border-orange-500"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="bg-black/50 border-orange-500/20 focus:border-orange-500"
                rows={5}
              />
            </div>
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </motion.form>

          <motion.p 
            animate={{
              opacity: isExpanded ? 0 : 1,
              height: isExpanded ? 0 : "auto",
            }}
            className="text-center text-gray-400 mt-4"
          >
            or email me at{" "}
            <a
              href="mailto:dutta.rda99@gmail.com"
              className="text-orange-500 hover:text-orange-400 transition-colors"
            >
              dutta.rda99@gmail.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;